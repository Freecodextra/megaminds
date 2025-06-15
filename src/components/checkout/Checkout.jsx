import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../common/LoadingSpinner";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Checkout() {
  const {
    cart,
    user,
    placeOrder,
    userOrders,
    navigate,
    loadCart,
    completeOrder,
    logFailedTransaction,
  } = useAppContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const orderPlacedRef = useRef(false);

  // Helper to fetch a single order by ID
  async function fetchOrderById(orderId) {
    try {
      const res = await axiosInstance.get(`orders/${orderId}/`);
      return res.data;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    async function initCheckout() {
      if (orderPlacedRef.current) return;
      orderPlacedRef.current = true;

      setLoading(true);

      // If orderId is in query, fetch and show that order
      const orderId = query.get("orderId");
      if (orderId) {
        const orderData = await fetchOrderById(orderId);
        setOrder(orderData);
        setLoading(false);
        return;
      }

      // If user has a pending order, show it
      const pendingOrder = userOrders.find((o) => o.status === "Pending");
      if (pendingOrder) {
        const orderData = await fetchOrderById(pendingOrder.id);
        setOrder(orderData);
        setLoading(false);
        toast.success("You have a pending order. Loading your previous order.");
        return;
      }

      // If cart is empty, redirect to cart
      if (!cart || cart.length === 0) {
        navigate("/cart");
        return;
      }

      // Otherwise, place a new order
      const newOrder = await placeOrder();
      setOrder(newOrder);
      setLoading(false);
      loadCart();
    }
    initCheckout();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <div className="mt-36 text-center text-red-500">
        Could not load order. Please try again.
      </div>
    );
  }

  // Paystack config
  const paystackConfig = {
    email: user.email,
    amount: Number(order.total_price) * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    onSuccess: (ref) => {
      completeOrder(order.id, order.total_price, ref.reference);
      navigate("/profile");
    },
    onClose: () => {
      logFailedTransaction(order.id, order.total_price);
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-36">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Summary</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-4">
          <div className="font-semibold mb-2">Order ID:</div>
          <div className="text-gray-700">{order.id}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Total:</div>
          <div className="text-gray-700">
            ₦{Number(order.total_price).toLocaleString()}
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Status:</div>
          <div className="text-gray-700">{order.status}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Items:</div>
          <ul>
            {order.items?.map((item) => (
              <li key={item.id}>
                {item.product.name} &times; {item.quantity}
              </li>
            ))}
          </ul>
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
