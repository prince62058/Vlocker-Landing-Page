
"use client"

import { Emi } from "@/app/types/emi";
import { BASE_URL } from "@/lib/utils/api";
import { toast } from "react-hot-toast";
import { getStorageItem } from "@/lib/utils/storage";

export default function EmiCard({ emi }: { emi: Emi }) {

  const handlePayNow = async () => {
    const token = getStorageItem("token");
    if (!token) {
      alert("Please login again to continue.");
      return;
    }

    try {
      // 1. Create Order
      const res = await fetch(`${BASE_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          loanId: emi.loanId,
          installmentId: emi.installmentId 
        }),
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to create payment order");
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_S8rAkegpLCFP7n", // Hardcoded Key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "VLocker Payment",
        description: `EMI ${emi.id} Payment for ${emi.imei || "Device"}`,
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
              loanId: emi.loanId,
              installmentId: emi.installmentId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment Successful!");
            setTimeout(() => window.location.reload(), 1500);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          contact: emi.customerMobileNumber,
        },
        theme: {
          color: "#bd24df",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const statusStyles: any = {
    COMPLETED: "border-green-500 bg-green-500/10 text-green-400",
    PAID: "border-green-500 bg-green-500/10 text-green-400",
    PENDING: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
    OVERDUE: "border-red-500 bg-red-500/10 text-red-500",
    PARTIAL: "border-orange-500 bg-orange-500/10 text-orange-400",
    UPCOMING: "border-border bg-darkmode/40 text-lightblue",
  };

  const currentStatus = (emi.status === "PAID" || emi.status === "COMPLETED") ? "PAID" : emi.status;

  return (
    <div
      className={`
                    w-full rounded-xl border p-5 md:p-6
                    flex flex-col md:flex-row items-center md:justify-between
                    gap-6 md:gap-4
                    transition 
                    text-center md:text-left
                    ${statusStyles[emi.status] || statusStyles.UPCOMING}
                `}
    >
      {/* LEFT  */}
      <div className="w-full md:w-auto">
        <p className="text-white font-semibold text-xl md:text-lg">
          EMI {emi.id}
        </p>
        <p className="text-lightblue text-sm mt-1">Due Date: {emi.date}</p>
        <p className="text-lightblue text-xs opacity-70 mt-1">
          ID: {emi.installmentId}
        </p>
      </div>

      {/* CENTER  */}
      <div className="w-full md:w-auto py-2 md:py-0">
        <p className="text-white text-3xl md:text-2xl font-bold">
          ₹{emi.amount}
        </p>
        {emi.status === "OVERDUE" && emi.lateFee && emi.lateFee > 0 && (
          <p className="text-green-500 text-sm font-bold mt-1">
            + ₹{emi.lateFee} Overdue Addon
          </p>
        )}
        <p className="text-lightblue text-sm mt-1">
          Monthly Installment
        </p>
      </div>

      {/* RIGHT  */}
      <div className="w-full md:w-auto flex flex-col items-center gap-3">
        <p className="text-sm font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg">
          {currentStatus}
        </p>

        {emi.status !== "PAID" && emi.status !== "COMPLETED" && (
          <button
            onClick={handlePayNow}
            className="
                w-full md:w-auto
                text-sm md:text-xs
                px-8 md:px-6 py-3 md:py-2
                rounded-xl md:rounded-md
                bg-secondary text-white
                hover:opacity-90
                active:scale-95
                transition
                font-bold
                shadow-lg shadow-secondary/20
            "
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}
