"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Logo from "../../layout/header/logo";
import { BASE_URL } from "@/lib/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { setStorageItem } from "@/lib/utils/storage";

const Signin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [banMessage, setBanMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoPay = searchParams.get("autoPay") === "true";
  const amountToPay = searchParams.get("amount");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validatePhone = () => {
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!phone) {
      setError("Phone number is required");
      return false;
    }

    if (!indianPhoneRegex.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return false;
    }

    setError("");
    return true;
  };

  const handleGetOtp = async () => {
    if (validatePhone()) {
      setLoading(true);
      setError("");
      setIsBanned(false);
      try {
        const res = await fetch(`${BASE_URL}/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, type: "login" }),
        });
        const data = await res.json();

        if (res.status === 403 || data.isBanned || data.message?.toLowerCase().includes("banned") || data.message?.toLowerCase().includes("suspended") || data.message?.toLowerCase().includes("deactivated")) {
          setIsBanned(true);
          const msg = data.message || "Your account has been suspended or banned by administration. Please contact support.";
          setBanMessage(msg);
          setError(msg);
          toast.error(msg);
          return;
        }

        if (data.success) {
          setShowOtp(true);
          toast.success("OTP sent successfully");
          setTimeout(() => otpRefs.current[0]?.focus(), 100);
        } else {
          setError(data.message || "Failed to send OTP");
          toast.error(data.message || "Failed to send OTP");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;

    setLoading(true);
    setError("");
    try {
      const otpCode = otp.join("");
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otpCode }),
      });
      const data = await res.json();

      if (res.status === 403 || data.isBanned || data.message?.toLowerCase().includes("banned") || data.message?.toLowerCase().includes("suspended") || data.message?.toLowerCase().includes("deactivated")) {
        setIsBanned(true);
        const msg = data.message || "Your account has been suspended or banned by administration. Please contact support.";
        setBanMessage(msg);
        setError(msg);
        toast.error(msg);
        return;
      }

      if (data.success) {
        setStorageItem("token", data.data.token);
        setStorageItem("user", JSON.stringify(data.data));
        toast.success("Login successful!");
        onSuccess?.();
        const redirectUrl = autoPay 
          ? `/payment?autoPay=true${amountToPay ? `&amount=${amountToPay}` : ""}` 
          : "/payment";
        router.push(redirectUrl);
      } else {
        setError(data.message || "Invalid OTP");
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const resetForm = () => {
    setIsBanned(false);
    setShowOtp(false);
    setOtp(["", "", "", ""]);
    setError("");
    setBanMessage("");
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const canSignIn = isOtpComplete && agree && !loading && !isBanned;

  return (
    <section className="pb-20 pt-10 px-4">
      <div className="container mx-auto">
        <div className="max-w-[500px] mx-auto">
          <div className="bg-tablebg/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Background Glow  */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 ${isBanned ? "bg-red-600/30" : "bg-primary/20"} blur-[80px] rounded-full transition-all duration-700`}></div>
            <div className={`absolute -bottom-24 -left-24 w-48 h-48 ${isBanned ? "bg-red-500/20" : "bg-secondary/10"} blur-[80px] rounded-full transition-all duration-700`}></div>

            <div className="relative z-10">
              {/* User Ban / Suspended Notice Box */}
              {isBanned ? (
                <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="mx-auto w-20 h-20 rounded-3xl bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center shadow-lg shadow-red-500/20 text-red-400">
                    <Icon icon="solar:shield-warning-bold" className="text-4xl" />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-black uppercase tracking-wider rounded-full mb-3">
                      Access Denied
                    </span>
                    <h3 className="text-white text-2xl font-black mb-2 tracking-tight">
                      Account Suspended
                    </h3>
                    <p className="text-red-300/90 text-sm font-medium leading-relaxed bg-red-950/40 border border-red-500/20 rounded-2xl p-4 mt-3">
                      {banMessage || "Your account linked to this mobile number has been suspended or banned by administration."}
                    </p>
                    <p className="text-white/60 text-xs mt-3">
                      Mobile Number: <span className="font-bold text-white">+91 {phone}</span>
                    </p>
                  </div>

                  <div className="pt-2 space-y-3">
                    <a
                      href={`mailto:support@vlocker.in?subject=Account%20Suspension%20Appeal%20-%20%2B91${phone}`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-red-600/30"
                    >
                      <Icon icon="solar:letter-bold" className="text-lg" />
                      Contact Support (Email)
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-3 px-6 rounded-2xl text-sm font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
                    >
                      Try Another Mobile Number
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-10 text-center">
                    <h3 className="text-white text-3xl font-black mb-3 tracking-tight">
                      Welcome Back
                    </h3>
                    <p className="text-lightblue text-sm opacity-80">
                      {showOtp 
                        ? `Enter the 4-digit code sent to +91 ${phone}`
                        : "Securely access your device management dashboard"}
                    </p>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-6">
                    {/* Phone input  */}
                    {!showOtp && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-lightblue uppercase tracking-widest ml-1 opacity-70">
                          Mobile Number
                        </label>
                        <div className="relative group">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lightblue/50 font-bold group-focus-within:text-primary transition-colors">
                            +91
                          </span>
                          <input
                            type="tel"
                            placeholder="00000 00000"
                            value={phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              setPhone(value);
                            }}
                            maxLength={10}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-16 pr-5 text-lg text-white outline-hidden transition-all duration-300 focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        {error && <p className="text-xs text-red-400 ml-1 font-medium">{error}</p>}
                      </div>
                    )}

                    {/* OTP Boxes  */}
                    {showOtp && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between gap-3 px-2">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => {
                                otpRefs.current[index] = el;
                              }}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(e.target.value, index)}
                              onKeyDown={(e) => handleOtpKeyDown(e, index)}
                              className="w-full aspect-square text-center text-2xl font-black rounded-2xl border border-white/10 bg-white/5 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                            />
                          ))}
                        </div>
                        
                        {error && <p className="text-center text-sm text-red-400 font-medium">{error}</p>}

                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <input
                            type="checkbox"
                            id="agree-checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mt-1 w-5 h-5 accent-primary cursor-pointer rounded-lg"
                          />
                          <label htmlFor="agree-checkbox" className="text-sm text-lightblue cursor-pointer leading-relaxed">
                            I agree to the{" "}
                            <Link
                              href="/terms-and-conditions"
                              target="_blank"
                              className="text-white font-bold hover:text-primary underline transition-colors"
                            >
                              Terms &amp; Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy-policy"
                              target="_blank"
                              className="text-white font-bold hover:text-primary underline transition-colors"
                            >
                              Privacy Policy
                            </Link>{" "}
                            for secure EMI management.
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Buttons  */}
                    <div className="pt-4">
                      {!showOtp ? (
                        <button
                          type="button"
                          onClick={handleGetOtp}
                          disabled={loading}
                          className="w-full group relative bg-linear-to-r from-primary to-secondary hover:brightness-110 text-white py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-50 overflow-hidden"
                        >
                          <span className="relative z-10">{loading ? "Sending OTP..." : "Get Started"}</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!canSignIn}
                          className={`w-full py-4 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xl
                            ${
                              canSignIn
                                ? "bg-primary text-white shadow-primary/20 hover:brightness-110"
                                : "bg-white/10 text-white/30 cursor-not-allowed border border-white/5"
                            }
                          `}
                        >
                          {loading ? "Verifying..." : "Confirm & Sign In"}
                        </button>
                      )}
                      
                      {showOtp && (
                        <button 
                          type="button"
                          onClick={resetForm}
                          className="w-full mt-6 text-lightblue text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
                        >
                          Use a different number
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}

              <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-lightblue/40 text-[10px] uppercase tracking-[0.2em] font-black">
                  Powered by VLocker Security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

