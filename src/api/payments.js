// src/api/payment.js
import axiosInstance from "./axiosInstance";

export async function fetchPayments() {
  return axiosInstance.get("payments/");
}