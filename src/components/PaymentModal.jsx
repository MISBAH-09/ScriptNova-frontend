// src/components/PaymentModal.jsx
// Two-step PayFast payment:
//   Step 1 — enter mobile/account number → OTP sent
//   Step 2 — enter OTP → payment complete, subscription activated

import { useEffect, useState } from "react";
import { getPaymentInstruments, initiatePayment, verifyOTPAndPay } from "../services/payment";

export default function PaymentModal({ plan, onClose }) {
  const [step, setStep]               = useState(1); // 1 = account entry, 2 = OTP
  const [instruments, setInstruments] = useState([]);
  const [instrTypeId, setInstrTypeId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [otp, setOtp]                 = useState("");
  const [orderData, setOrderData]     = useState(null); // { order_id, transaction_token }
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");

  // Load payment instruments (JazzCash, Card, etc.)
  // useEffect(() => {
  //   getPaymentInstruments()
  //     .then((data) => {
  //       const list = Array.isArray(data) ? data : data?.instrument_types || [];
  //       setInstruments(list);
  //       if (list.length > 0) setInstrTypeId(String(list[0].id || list[0].instrument_type_id || ""));
  //     })
  //     .catch(() => setError("Could not load payment methods. Try again."));
  // }, []);

  useEffect(() => {
    // TEMP FIX (remove when real flow implemented)
    const mock = [
      { id: 1, name: "JazzCash" },
      { id: 2, name: "EasyPaisa" },
      { id: 3, name: "Debit/Credit Card" }
    ];

    setInstruments(mock);
    setInstrTypeId("1");
  }, []);

  const handleInitiate = async () => {
    setError("");
    if (!accountNumber.trim()) return setError("Please enter your account / mobile number.");
    if (!instrTypeId)          return setError("Please select a payment method.");
    console.log("Initiating payment for", { plan: plan.name, accountNumber, instrTypeId });

    setLoading(true);
    try {
      const res = await initiatePayment({
        plan_name:          plan.name,
        account_number:     accountNumber.trim(),
        instrument_type_id: instrTypeId,
      });
      console.log("Initiate response:", res);
      if (!res.success) throw new Error(res.message || "Failed to initiate payment.");
      setOrderData({ order_id: res.order_id, transaction_token: res.transaction_token });
      setStep(2);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    if (!otp.trim()) return setError("Please enter the OTP.");

    setLoading(true);
    try {
      const res = await verifyOTPAndPay({
        order_id:          orderData.order_id,
        transaction_token: orderData.transaction_token,
        otp:               otp.trim(),
      });
      if (!res.success) throw new Error(res.message || "Payment failed.");
      setSuccess(`Payment successful! ${res.plan} is now active. Refresh the page.`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 text-white rounded-2xl w-full max-w-md p-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-1">{plan.display_name}</h2>
        <p className="text-gray-400 text-sm mb-6">
          Rs {plan.price_pkr}
          {plan.duration_days ? ` / ${plan.duration_days === 3 ? "3 days" : "month"}` : ""}
        </p>

        {success ? (
          <div className="text-green-400 font-semibold text-center py-6">{success}</div>
        ) : (
          <>
            {/* Step 1 — Account */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Payment Method</label>
                  {instruments.length === 0 ? (
                    <p className="text-gray-500 text-sm">Loading payment methods…</p>
                  ) : (
                    <select
                      value={instrTypeId}
                      onChange={(e) => setInstrTypeId(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                    >
                      {instruments.map((inst) => {
                        const id   = inst.id || inst.instrument_type_id;
                        const name = inst.name || inst.instrument_type_name || `Method ${id}`;
                        return (
                          <option key={id} value={String(id)}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Mobile / Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="03001234567"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  onClick={handleInitiate}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading ? "Processing…" : "Send OTP"}
                </button>
              </div>
            )}

            {/* Step 2 — OTP */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-300">
                  An OTP has been sent to <strong>{accountNumber}</strong>. Enter it below to
                  complete your payment.
                </p>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">OTP</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm tracking-widest"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading ? "Verifying…" : "Complete Payment"}
                </button>

                <button
                  onClick={() => { setStep(1); setError(""); setOtp(""); }}
                  className="w-full text-gray-400 hover:text-white text-sm mt-1"
                >
                  ← Go back
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
