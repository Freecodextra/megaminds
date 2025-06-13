import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

function Profile() {
  const { user, editUserDetails, userOrders, userTransactions, navigate, deleteTransaction, deleteOrder } = useAppContext();
  const [tab, setTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Add this effect to update form when user data is loaded or changes
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = e => {
    e.preventDefault();
    editUserDetails(form.firstName, form.lastName, form.email, form.phone, form.address);
    setEditMode(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-36">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex gap-4 mb-8 border-b">
        <button
          className={`py-2 px-4 ${tab === "profile" ? "border-b-2 border-dark-blue font-bold" : ""}`}
          onClick={() => setTab("profile")}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 ${tab === "orders" ? "border-b-2 border-dark-blue font-bold" : ""}`}
          onClick={() => setTab("orders")}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 ${tab === "transactions" ? "border-b-2 border-dark-blue font-bold" : ""}`}
          onClick={() => setTab("transactions")}
        >
          Transactions
        </button>
      </div>

      {/* Profile Info */}
      {tab === "profile" && (
        <div>
          {!editMode ? (
            <div className="space-y-4">
              <div><span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}</div>
              <div><span className="font-semibold">Email:</span> {user?.email}</div>
              <div><span className="font-semibold">Phone:</span> {user?.phone}</div>
              <div><span className="font-semibold">Address:</span> {user?.address}</div>
              <button
                className="mt-4 bg-dark-blue text-white px-6 py-2 rounded hover:bg-[#000074]"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-dark-blue text-white px-6 py-2 rounded hover:bg-[#000074]"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-black px-6 py-2 rounded"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Orders */}
      {tab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="space-y-4">
            {userOrders && userOrders.length > 0 ? (
              userOrders.map(order => (
                <div key={order.id} className="border rounded p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">Order #{order.id}</div>
                      <div>Date: {order.date}</div>
                      <div>
                        Status:{" "}
                        <span
                          className={
                            "inline-block px-3 py-1 rounded-full text-xs font-semibold " +
                            (order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700")
                          }
                        >
                          {order.status}
                        </span>
                      </div>
                      <div>Address: {order.address}</div>
                    </div>
                    <div className="font-bold text-dark-blue">₦{order.total.toLocaleString()}</div>
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold">Items:</div>
                    <ul className="list-disc ml-6">
                      {order.itemsDetails?.map(item => (
                        <li key={item.productId}>
                          {item.name} &times; {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {order.status === "Pending" && (
                    <div className="flex gap-4 mt-4">
                      <button
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
                        onClick={() => navigate(`/checkout?orderId=${order.id}`)}
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete Order
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>No orders found.</div>
            )}
          </div>
        </div>
      )}

      {/* Transactions */}
      {tab === "transactions" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <div className="space-y-4">
            {userTransactions && userTransactions.length > 0 ? (
              userTransactions.map(tx => (
                <div key={tx.id} className="border rounded p-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <div>
                    <div className="font-semibold">Transaction #{tx.id}</div>
                    <div>Date: {tx.date}</div>
                    <div>Type: {tx.type}</div>
                    <div>
                      Status:{" "}
                      <span className={tx.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {tx.status}
                      </span>
                    </div>
                    <div>Reason: {tx.reason}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold text-dark-blue text-lg">
                      ₦{tx.amount.toLocaleString()}
                    </div>
                    {tx.status === "Pending" && (
                      <button
                        className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={() => deleteTransaction(tx.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>No transactions found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;