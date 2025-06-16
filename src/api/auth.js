import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function register({ firstName, lastName, email, password }) {
  return axios.post(`${API_URL}register/`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    username: email, // required by backend
  });
}

export async function login({ email, password }) {
  return axios.post(`${API_URL}login/`, {
    email,
    password,
  });
}

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Fetch user profile using access token
export async function getUserProfile() {
  return axiosInstance.get("profile/");
}

export async function logout(refresh) {
  return axios.post(`${API_URL}logout/`, { refresh });
}

export async function updateUserProfile(data) {
  return axiosInstance.put("profile/", data);
}