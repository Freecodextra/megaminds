import { useAppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, addQuantity, removeQuantity, handleRemoveCartItem, total } = useAppContext();

  if (!cart || cart.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 mt-36 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/all-products" className="inline-block mt-4 px-6 py-3 bg-dark-blue text-white rounded hover:bg-[#000074] transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-36">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col gap-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 last:border-b-0">
              <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded-lg shadow" />
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-xl font-bold text-dark-blue">₦{item.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => removeQuantity(item.id)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                  >-</button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addQuantity(item.id)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                  >+</button>
                  <button
                    onClick={() => handleRemoveCartItem(item.id)}
                    className="ml-6 text-red-500 hover:underline text-sm"
                  >Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cart Summary */}
      <div className="bg-light-gray rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-lg">Total:</div>
          <div className="text-2xl font-bold text-dark-blue">₦{total.toLocaleString()}</div>
        </div>
        <Link
          to="/checkout"
          className="px-8 py-3 bg-dark-blue text-white rounded-lg font-semibold text-lg hover:bg-[#000074] transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
