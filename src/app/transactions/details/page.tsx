"use client";

import { useEffect, useState, Suspense } from "react";
import { BASE_URL } from "@/lib/utils/api";
import EmiList from "./components/EmiList";
import { useRouter, useSearchParams } from "next/navigation";
import { getStorageItem } from "@/lib/utils/storage";

function TransactionDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No transaction ID provided");
      return;
    }

    const fetchLoanDetails = async () => {
      const token = getStorageItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/customerLoan/single/${id}`, {
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
  }, [id, router]);

  if (loading) {
    return (
      <main className="bg-body-bg min-h-screen flex items-center justify-center text-white">
        <p>Loading loan details...</p>
      </main>
    );
  }

  if (error || !loan) {
    return (
      <main className="bg-body-bg min-h-screen flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-center mb-6">{error || "Loan not found"}</p>
        <button 
          onClick={() => router.push("/transactions")}
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Back to Transactions
        </button>
      </main>
    );
  }

  // Map backend installments to the format expected by EmiList/EmiCard
  const emis = [...loan.installments]
    .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .map((inst: any, idx: number) => ({
      id: idx + 1,
      installmentId: inst._id,
      amount: inst.amount + (inst.lateFee || 0),
      lateFee: inst.lateFee || 0,
      date: new Date(inst.dueDate).toLocaleDateString(),
      status: inst.status,
      loanId: loan._id,
      customerMobileNumber: loan.customerMobileNumber,
      imei: loan.imeiNumber1
    }));

  return (
    <main className="bg-body-bg min-h-screen">
      <div className="container pt-40 pb-18">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {loan.customerId?.customerName || "Loan"}'s Details
            </h2>
            <p className="text-lightblue">IMEI: {loan.imeiNumber1} | {loan.mobileBrand} {loan.mobileModel}</p>
          </div>
          <div className="bg-darkmode/50 p-4 rounded-xl border border-border/50 text-center min-w-[150px]">
            <p className="text-lightblue text-sm uppercase">Loan Amount</p>
            <p className="text-white text-2xl font-bold">₹{loan.loanAmount?.toLocaleString()}</p>
          </div>
        </div>

        <EmiList emis={emis} />
      </div>
    </main>
  );
}

export default function TransactionDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white bg-body-bg">Loading...</div>}>
      <TransactionDetailsContent />
    </Suspense>
  );
}
