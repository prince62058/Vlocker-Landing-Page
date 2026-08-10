"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { BASE_URL } from "@/lib/utils/api";
import { toast } from "react-hot-toast";

interface QuickBanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickBanModal({ isOpen, onClose }: QuickBanModalProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCheckStatus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${BASE_URL}/auth/check-ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.message || "Customer not found");
        toast.error(data.message || "Customer not found");
      }
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (targetBanState: boolean) => {
    if (!phone) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/toggle-ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, isBanned: targetBanState }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setResult((prev: any) => ({
          ...prev,
          isBanned: data.isBanned,
          isDisabled: data.isDisabled,
          message: data.message,
        }));
      } else {
        toast.error(data.message || "Failed to update ban status");
      }
    } catch (err) {
      toast.error("Failed to update status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-tablebg border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 blur-[60px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
          aria-label="Close"
        >
          <Icon icon="solar:close-circle-bold" className="text-2xl" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-2xl">
            <Icon icon="solar:shield-user-bold" />
          </div>
          <div>
            <h3 className="text-white text-xl font-black">User Ban Management</h3>
            <p className="text-lightblue/70 text-xs">Search and instantly Ban or Unban any user</p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleCheckStatus} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-lightblue uppercase tracking-widest mb-2 ml-1">
              Customer Mobile Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lightblue/50 font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    if (result) setResult(null);
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-14 pr-4 text-white text-base outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="px-5 py-3 bg-primary hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-1.5"
              >
                {loading ? (
                  <Icon icon="eos-icons:loading" className="text-lg animate-spin" />
                ) : (
                  <Icon icon="solar:magnifer-bold" className="text-lg" />
                )}
                <span>Search</span>
              </button>
            </div>
            {error && <p className="text-xs text-red-400 mt-2 ml-1">{error}</p>}
          </div>
        </form>

        {/* User Search Result Card */}
        {result && (
          <div className="mt-6 p-5 bg-darkmode/70 border border-white/10 rounded-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-lightblue/60 uppercase tracking-wider font-semibold">User Details</p>
                <h4 className="text-white text-lg font-bold mt-0.5">{result.name}</h4>
                <p className="text-white/70 text-xs font-mono">+91 {result.phone}</p>
              </div>

              <div>
                {result.isBanned ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Banned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-black uppercase tracking-wider rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Toggle Actions */}
            <div className="pt-2 border-t border-white/5">
              {result.isBanned ? (
                <button
                  type="button"
                  onClick={() => handleToggleBan(false)}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Icon icon="eos-icons:loading" className="animate-spin text-lg" />
                  ) : (
                    <Icon icon="solar:shield-check-bold" className="text-lg" />
                  )}
                  <span>Unban &amp; Activate User</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleToggleBan(true)}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Icon icon="eos-icons:loading" className="animate-spin text-lg" />
                  ) : (
                    <Icon icon="solar:shield-warning-bold" className="text-lg" />
                  )}
                  <span>Ban User (Suspend Access)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer info note */}
        <p className="text-white/40 text-[11px] text-center mt-6">
          Changes take effect instantly across mobile apps, OTP logins, and payment portals.
        </p>
      </div>
    </div>
  );
}
