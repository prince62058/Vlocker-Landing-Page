
"use client";

import { useEffect, useState } from "react";
import TransactionsTable from "./TransactionsTable";
import { useRouter } from "next/navigation";
import { getStorageItem } from "@/lib/utils/storage";

export default function TransactionsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getStorageItem("token");
    setIsLoggedIn(!!token);
    setChecking(false);
  }, []);

  if (checking) return null;

  return (
    <div className="min-h-screen bg-body-bg">
      <main className="container pt-40 pb-10">
        <h2 className="mb-10 text-white">Your Transactions</h2>
        
        {isLoggedIn ? (
          <TransactionsTable />
        ) : (
          <div className="bg-tablebg p-12 rounded-2xl border border-border text-center">
             <h3 className="text-white text-xl mb-4">Please Sign In</h3>
             <p className="text-lightblue mb-8">You need to be logged in to view your loans and transactions.</p>
             <button 
               onClick={() => window.location.href = "/"}
               className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
             >
               Go to Login
             </button>
          </div>
        )}
      </main>
    </div>
  );
}
