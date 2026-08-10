"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/utils/api";

const ITEMS_PER_PAGE = 10;

export default function TransactionsTable() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Please sign in to view your transactions.");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/customerLoan/my-loans`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setLoans(data.data);
        } else {
          setError(data.message || "Failed to fetch transactions.");
        }
      } catch (error) {
        console.error("Failed to fetch loans:", error);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const totalPages = Math.ceil(loans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = loans.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="bg-tablebg p-10 text-center text-white border border-border rounded-2xl">
        <p>Loading your transactions...</p>
      </div>
    );
  }

  const isBanned = error && (error.toLowerCase().includes("suspended") || error.toLowerCase().includes("banned") || error.toLowerCase().includes("deactivated"));

  if (error) {
    if (isBanned) {
      return (
        <div className="bg-tablebg/80 backdrop-blur-xl p-8 text-center text-white border border-red-500/40 rounded-3xl shadow-2xl shadow-red-500/10 max-w-lg mx-auto my-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-3xl mb-4 text-red-400">
            ⛔
          </div>
          <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-black uppercase tracking-wider rounded-full mb-3">
            Access Denied
          </span>
          <h3 className="text-xl font-black mb-2">Account Suspended</h3>
          <p className="text-red-300/90 text-sm mb-6 bg-red-950/40 border border-red-500/20 rounded-xl p-3">{error}</p>
          <a
            href="mailto:support@vlocker.in?subject=Transactions%20Account%20Suspension%20Inquiry"
            className="inline-block bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-red-600/30"
          >
            Contact Support
          </a>
        </div>
      );
    }

    return (
      <div className="bg-tablebg p-10 text-center text-white border border-red-500/50 rounded-2xl">
        <p className="text-red-400 mb-4">{error}</p>
        {!localStorage.getItem("token") && (
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <div className="bg-tablebg p-10 text-center text-white border border-border rounded-2xl">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-tablebg border border-border rounded-2xl shadow-mentor-shadow overflow-hidden">
      {/* TABLE - Desktop Only */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-darkmode text-lightblue text-sm border-b border-border">
            <tr>
              <th className="px-6 py-4">S. No.</th>
              <th className="px-6 py-4">Device / Model</th>
              <th className="px-6 py-4">Loan Amount</th>
              <th className="px-6 py-4">EMI / Tenure</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((loan, idx) => (
              <tr
                key={loan._id}
                onClick={() => router.push(`/transactions/details/?id=${loan._id}`)}
                className="
                    border-b border-border last:border-0
                    hover:bg-darkmode/60
                    transition
                    cursor-pointer
                  "
              >
                <td className="px-6 py-5 text-white">{startIndex + idx + 1}</td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {loan.mobileBrand?.charAt(0) || "D"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{loan.mobileBrand} {loan.mobileModel}</p>
                      <p className="text-lightblue text-xs truncate">IMEI: {loan.imeiNumber1 || "N/A"}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-white font-medium whitespace-nowrap">₹{loan.loanAmount?.toLocaleString()}</td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="text-white">₹{loan.emiAmount?.toLocaleString()}</p>
                  <p className="text-lightblue text-xs">{loan.numberOfEMIs} Months</p>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                      loan.loanStatus === "APPROVED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {loan.loanStatus}
                  </span>
                </td>

                <td className="px-6 py-5 text-lightblue text-right text-sm whitespace-nowrap">
                  {new Date(loan.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS - Mobile Only */}
      <div className="md:hidden divide-y divide-border">
        {currentData.map((loan, idx) => (
          <div
            key={loan._id}
            onClick={() => router.push(`/transactions/details/?id=${loan._id}`)}
            className="p-5 active:bg-darkmode transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center text-white font-semibold">
                  {loan.mobileBrand?.charAt(0) || "D"}
                </div>
                <div>
                  <p className="text-white font-medium">{loan.mobileBrand} {loan.mobileModel}</p>
                  <p className="text-lightblue text-xs">#{startIndex + idx + 1}</p>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                  loan.loanStatus === "APPROVED"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {loan.loanStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-lightblue text-[10px] uppercase font-bold tracking-widest mb-1">Loan Amount</p>
                <p className="text-white text-lg font-bold">₹{loan.loanAmount?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-lightblue text-[10px] uppercase font-bold tracking-widest mb-1">EMI / Tenure</p>
                <p className="text-white">₹{loan.emiAmount?.toLocaleString()}</p>
                <p className="text-lightblue text-xs">{loan.numberOfEMIs} Months</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border/30">
              <p className="text-lightblue text-xs">IMEI: {loan.imeiNumber1 || "N/A"}</p>
              <p className="text-lightblue text-xs">{new Date(loan.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border text-sm">
          <p className="text-lightblue">
            Showing {startIndex + 1} to {Math.min(endIndex, loans.length)}{" "}
            of {loans.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded-md border border-border text-lightblue
                disabled:opacity-40 hover:bg-darkmode transition"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border transition
                    ${
                      currentPage === page
                        ? "bg-secondary text-white border-secondary"
                        : "border-border text-lightblue hover:bg-darkmode"
                    }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded-md border border-border text-lightblue
                disabled:opacity-40 hover:bg-darkmode transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
