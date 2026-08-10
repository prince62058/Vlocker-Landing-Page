"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/lib/utils/api";
import { getStorageItem, removeStorageItem } from "@/lib/utils/storage";

// Extend window object for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentContent() {
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoPayTriggered, setAutoPayTriggered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoPay = searchParams.get("autoPay") === "true";
  const amountFromUrl = searchParams.get("amount");
  const payFull = searchParams.get("payFull") === "true";
  const installmentIdFromUrl = searchParams.get("installmentId");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const paymentLoadingRef = useRef(false);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const token = getStorageItem("token");
      const userStr = getStorageItem("user");
      
      if (!token || !userStr) {
        const params = searchParams.toString();
        router.push(`/signin${params ? `?${params}` : ""}`);
        return;
      }

      let userData: any = {};
      try {
        userData = JSON.parse(userStr);
      } catch (e) {
        userData = {};
      }
      let loanId = userData.loanId;

      // If loanId is missing from userData, try to fetch all loans and pick the first one
      if (!loanId) {
        try {
          const res = await fetch(`${BASE_URL}/customerLoan/my-loans`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (data.success && data.data.length > 0) {
            loanId = data.data[0]._id;
          } else {
            setError("No active loan found for your account.");
            setLoading(false);
            return;
          }
        } catch (err) {
          setError("Failed to discover your loan. Please try again.");
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(`${BASE_URL}/customerLoan/single/${loanId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setLoan(data.data);
        } else {
          setError(data.message || "Failed to fetch loan details");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [router, searchParams]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;

    const triggerAutoPayment = () => {
      if (autoPay && loan && !loading && !autoPayTriggered && !paymentLoadingRef.current) {
        if (!window.Razorpay) {
          if (retryCount < maxRetries) {
            retryCount++;
            timerRef.current = setTimeout(triggerAutoPayment, 1000);
            return;
          }
          console.error("Razorpay SDK not loaded after retries");
          return;
        }

        setAutoPayTriggered(true);
        paymentLoadingRef.current = true;
        // Final check to ensure we use the amount from URL if present
        timerRef.current = setTimeout(() => {
          handlePayment(amountFromUrl || undefined);
          paymentLoadingRef.current = false;
        }, 500);
      }
    };

    triggerAutoPayment();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoPay, loan, loading, autoPayTriggered, amountFromUrl]);

  const handlePayment = async (amountOverride?: string) => {
    const token = getStorageItem("token");
    if (!token || !loan) return;

    try {
      // 1. Create Order
      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          loanId: loan._id,
          amount: amountOverride,
          // Pay a specific EMI (allows proactive / early payment before due date).
          ...(installmentIdFromUrl ? { installmentId: installmentIdFromUrl } : {}),
          // Foreclosure: pay the entire remaining loan in one go.
          ...(payFull ? { payFull: true } : {}),
        }),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to create payment order");
        return;
      }

      // If we have an amount override from the URL, but the backend calculated differently,
      // we should probably warn or just use the backend's (source of truth).
      // However, to satisfy "amount on red screen = razorpay amount", 
      // we'll assume the backend logic for "overdue + current" matches the red screen.

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_S8rAkegpLCFP7n", // Hardcoded Key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "VLocker Payment",
        description: `Loan Payment for ${loan.imeiNumber1 || "Device"}`,
        order_id: data.order.id,
        handler: async (response: any) => {
          // 3. Verify Payment
          const verifyRes = await fetch(`${BASE_URL}/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              loanId: loan._id,
              ...(installmentIdFromUrl
                ? { installmentId: installmentIdFromUrl }
                : {}),
              ...(payFull ? { payFull: true } : {}),
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment Successful! Your device will be unlocked shortly.");
            window.location.reload();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          contact: loan.customerMobileNumber,
        },
        theme: {
          color: "#bd24df",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  const isBanned = error && (error.toLowerCase().includes("suspended") || error.toLowerCase().includes("banned") || error.toLowerCase().includes("deactivated"));

  if (loading) {
    return (
      <div className="min-h-screen bg-body-bg flex items-center justify-center text-white">
        <p>Loading your loan details...</p>
      </div>
    );
  }

  if (isBanned) {
    return (
      <div className="min-h-screen bg-body-bg flex flex-col items-center justify-center text-white p-4">
        <div className="max-w-md w-full bg-tablebg/80 backdrop-blur-xl border border-red-500/40 rounded-3xl p-8 text-center shadow-2xl shadow-red-500/10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-3xl mb-4 text-red-400">
            ⛔
          </div>
          <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-black uppercase tracking-wider rounded-full mb-3">
            Access Denied
          </span>
          <h2 className="text-2xl font-black text-white mb-2">Account Suspended</h2>
          <p className="text-red-300/90 text-sm mb-6 bg-red-950/40 border border-red-500/20 rounded-xl p-3">{error}</p>
          <div className="space-y-3">
            <a
              href="mailto:support@vlocker.in?subject=Payment%20Account%20Suspension%20Inquiry"
              className="w-full inline-block bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-red-600/30"
            >
              Contact Support
            </a>
            <button 
              onClick={() => {
                removeStorageItem("token");
                removeStorageItem("user");
                router.push("/");
              }}
              className="w-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white font-bold py-3 px-6 rounded-xl text-sm border border-white/10 transition-all"
            >
              Sign Out & Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-body-bg flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-center mb-6">{error}</p>
        <button 
          onClick={() => router.push("/")}
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const pendingAmount = loan.installments
    .filter((inst: any) => inst.status !== "PAID")
    .reduce((sum: number, inst: any) => sum + (inst.amount || 0) + (inst.lateFee || 0) + (inst.bounceFee || 0), 0);

  return (
    <div className="min-h-screen bg-body-bg pt-32 pb-10">
      <div className="container max-w-2xl">
        <div className="bg-card p-8 rounded-2xl shadow- mentor-shadow border border-border">
          <h2 className="text-3xl font-bold text-white mb-2 text-center uppercase tracking-wider">
            Loan Dashboard
          </h2>
          <p className="text-lightblue text-center mb-8 border-b border-border pb-4">
            Manage your EMI and overdue charges
          </p>

          {amountFromUrl && (
            <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl text-center mb-8 animate-pulse">
              <p className="text-lightblue text-xs uppercase tracking-[0.2em] font-black mb-2">Amount from Red Screen</p>
              <p className="text-white text-4xl font-black">₹{Number(amountFromUrl).toLocaleString()}</p>
              <p className="text-lightblue text-xs mt-2 opacity-60 italic">This amount is synced for immediate unlock</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-darkmode/50 p-4 rounded-xl border border-border/50">
              <p className="text-lightblue text-sm mb-1 uppercase tracking-tight">Total Pending</p>
              <p className="text-white text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-darkmode/50 p-4 rounded-xl border border-border/50">
              <p className="text-lightblue text-sm mb-1 uppercase tracking-tight">Status</p>
              <p className={`text-lg font-bold ${loan.loanStatus === 'APPROVED' ? 'text-green-400' : 'text-yellow-400'}`}>
                {loan.loanStatus}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-lightblue">Device IMEI</span>
              <span className="text-white font-medium">{loan.imeiNumber1}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-lightblue">Customer Name</span>
              <span className="text-white font-medium">{loan.customerId?.customerName || loan.customerId?.fullName}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-4">
              <span className="text-lightblue">Loan ID</span>
              <span className="text-white font-mono text-xs">{loan._id}</span>
            </div>
          </div>

          <div className="bg-tablebg rounded-xl overflow-hidden mb-8 border border-border/50">
            <div className="p-4 bg-darkmode border-b border-border">
              <h3 className="text-white font-semibold">Payment Schedule</h3>
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {loan.installments.map((inst: any, idx: number) => (
                <div key={idx} className="p-4 flex justify-between items-center border-b border-border last:border-0 hover:bg-darkmode/30 transition">
                  <div>
                    <p className="text-white font-medium">EMI #{idx + 1}</p>
                    <p className="text-xs text-lightblue">Due: {new Date(inst.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{(inst.amount + (inst.lateFee || 0)).toLocaleString()}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      inst.status === 'PAID' ? 'bg-green-500/20 text-green-400' : 
                      inst.status === 'OVERDUE' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {inst.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pendingAmount > 0 ? (
            <button 
              onClick={() => handlePayment(amountFromUrl || undefined)}
              className="w-full bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white text-xl py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              PAY NOW {amountFromUrl ? `₹${Number(amountFromUrl).toLocaleString()}` : `₹${pendingAmount.toLocaleString()}`}
            </button>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
              <p className="text-green-400 font-bold uppercase tracking-widest">All EMIs Paid! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-body-bg flex items-center justify-center text-white">
        <p>Initializing payment system...</p>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
