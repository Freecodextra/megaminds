import axiosInstance from "./axiosInstance";

export async function fetchProductsFromApi() {
  const res = await axiosInstance.get("products/");
  return res.data;
}