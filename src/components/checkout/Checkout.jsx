import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation } from "react-router-dom";
import { PaystackButton } from "react-paystack";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Checkout() {
  const { cart, user, placeOrder, completeOrder, userOrders, navigate, logFailedTransaction } = useAppContext();
  const [order, setOrder] = useState(null);
  const query = useQuery();
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (orderPlacedRef.current) return;
    orderPlacedRef.current = true;

    if (!user?.address) {
      navigate("/profile");
      return;
    }

    const orderId = query.get("orderId");
    if (orderId) {
      // Find the pending order by id
      const foundOrder = userOrders.find(o => String(o.id) === String(orderId));
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setOrder(null);
      }
      return;
    }

    // Only create a new order if there is no orderId in the query
    if (cart.length > 0) {
      const newOrder = placeOrder();
      setOrder(newOrder);
    }
  }, []); // <--- Only run once on mount!

  if (!user?.address) {
    return null;
  }

  if (!order) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 mt-36 text-center">
        <h2 className="text-2xl font-bold mb-4">No items to checkout.</h2>
        <button
          onClick={() => navigate("/all-products")}
          className="inline-block mt-4 px-6 py-3 bg-dark-blue text-white rounded hover:bg-[#000074] transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Use order.total for Paystack amount
  const paystackConfig = {
    email: user.email,
    amount: order.total * 100, // Paystack expects amount in kobo
    publicKey: "pk_test_c25a1208c25981418ed112b06fea6add931b3601",
    onSuccess: () => {
      completeOrder(order.id, order.total);
      navigate("/profile");
    },
    onClose: () => {
      // Log a failed/cancelled transaction
      logFailedTransaction(order.id, order.total);
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-36">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-4">
          <div className="font-semibold mb-2">Delivery Address:</div>
          <div className="text-gray-700">{user.address}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Items:</div>
          <ul className="list-disc ml-6">
            {order.itemsDetails.map(item => (
              <li key={item.productId}>
                {item.name} &times; {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-dark-blue">
            ₦{order.total.toLocaleString()}
          </span>
        </div>
      </div>
      <PaystackButton
        {...paystackConfig}
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-800 transition"
      >
        Pay Now
      </PaystackButton>
    </div>
  );
}

export default Checkout;
