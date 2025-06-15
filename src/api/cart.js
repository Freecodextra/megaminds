import axiosInstance from "./axiosInstance";

// Add item to cart
export async function addToCart(cartId, productId, quantity = 1) {
  return axiosInstance.post("cart-items/", {
    cart: cartId,
    product_id: productId,
    quantity: Number(quantity),
  });
}

// Update cart item quantity
export async function updateCartItem(cartItemId, quantity) {
  return axiosInstance.patch(`cart-items/${cartItemId}/`, { quantity });
}

// Remove cart item
export async function removeCartItem(cartItemId) {
  return axiosInstance.delete(`cart-items/${cartItemId}/`);
}

// Get current user's cart
export async function fetchCart() {
  return axiosInstance.get("cart/");
}

// Fetch all cart items for the current user's cart
export async function fetchCartItems() {
  return axiosInstance.get("cart-items/");
}