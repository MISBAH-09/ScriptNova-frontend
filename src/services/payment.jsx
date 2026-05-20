// src/services/payment.js
// PayFast Pakistan payment + subscription helpers

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function handleError(error) {
  if (error.response?.data?.message) throw new Error(error.response.data.message);
  throw new Error("Network error or server not responding");
}

export const getPlans = async () => {
  try {
    const r = await api.get("/plans/");
    return r.data.data || [];
  } catch (e) { handleError(e); }
};

export const getSubscriptionStatus = async () => {
  try {
    const r = await api.get("/subscription/status/");
    return r.data.data || null;
  } catch (e) { handleError(e); }
};

export const getPaymentInstruments = async () => {
  try {
    const r = await api.get("/payment/instruments/");
    return r.data.data || [];
  } catch (e) { handleError(e); }
};

export const initiatePayment = async ({ plan_name, account_number, instrument_type_id }) => {
  console.log("API call: initiatePayment", { plan_name, account_number, instrument_type_id });
  try {
    const r = await api.post("/payment/initiate/", {
      plan_name,
      account_number,
      instrument_type_id,
    });
    return r.data; // { success, order_id, transaction_token, message }
  } catch (e) { handleError(e); }
};

export const createCheckoutSession = async () => {
  try {
    const r = await api.post("/payments/create-checkout-session/");
    return r.data?.data?.url;
  } catch (e) { handleError(e); }
};

export const verifyOTPAndPay = async ({ order_id, transaction_token, otp }) => {
  try {
    const r = await api.post("/payment/verify-otp/", {
      order_id,
      transaction_token,
      otp,
    });
    return r.data; // { success, message, plan }
  } catch (e) { handleError(e); }
};

export const getTransactionStatus = async (order_id) => {
  try {
    const r = await api.get(`/payment/status/${order_id}/`);
    return r.data.data || null;
  } catch (e) { handleError(e); }
};
