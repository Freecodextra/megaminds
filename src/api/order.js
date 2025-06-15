import axiosInstance from "./axiosInstance";

// Place order (calls backend checkout endpoint)
export async function placeOrder() {
  return axiosInstance.post("checkout/");
}

// Fetch orders (calls backend orders endpoint)
export async function fetchOrders() {
  return axiosInstance.get("orders/");
}

// Delete order (calls backend delete order endpoint)
export async function deleteOrder(orderId) {
  return axiosInstance.delete(`orders/${orderId}/`);
}