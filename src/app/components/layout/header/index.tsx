"use client";

import { Headerdata } from "@/lib/data/pageData";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Signin from "../../auth/sign-in";
import QuickBanModal from "../../admin/QuickBanModal";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import { useRouter } from "next/navigation";
import { getStorageItem, removeStorageItem } from "@/lib/utils/storage";

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = getStorageItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    // Listen for storage events (e.g. from other tabs or same tab updates)
    window.addEventListener("storage", checkAuth);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen]);

  useEffect(() => {
    if (isSignInOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, navbarOpen]);

  const handleLogout = () => {
    removeStorageItem("token");
    removeStorageItem("user");
    setUser(null);
    router.push("/");
    window.location.reload();
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky
          ? " shadow-lg bg-body-bg bg-banner-image py-4"
          : "shadow-none py-6"
      }`}
    >
      <div>
        <div className="container flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex grow items-center gap-8 justify-center ml-14">
            {Headerdata.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Quick Ban Option Button */}
            <button
              onClick={() => setIsBanModalOpen(true)}
              className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 border border-red-500/30 duration-300 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-md shadow-red-500/10 cursor-pointer"
              title="Admin User Ban / Status Option"
            >
              <Icon icon="solar:shield-warning-bold" className="text-base text-red-400" />
              <span>Ban Option</span>
            </button>

            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-white font-medium">
                  Hi, {user.name || user.customerName || user.fullName || user.phone?.slice(-10)}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white duration-300 px-6 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="hidden lg:block bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white duration-300 px-6 py-2.5 rounded-xl font-bold cursor-pointer"
                onClick={() => {
                  setIsSignInOpen(true);
                }}
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setNavbarOpen(true)}
              className="block lg:hidden p-2 rounded-lg cursor-pointer"
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
            </button>
            
            {isSignInOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                <div
                  ref={signInRef}
                  className="relative mx-auto w-full max-w-md bg-purple-950/80 overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-simple-bg backdrop-blur-md"
                >
                  <button
                    onClick={() => {
                      setIsSignInOpen(false);
                      // Trigger auth re-check after modal closes (in case of successful login)
                      const storedUser = getStorageItem("user");
                      if (storedUser) {
                        try {
                          setUser(JSON.parse(storedUser));
                        } catch (e) {}
                      }
                    }}
                    className="absolute top-0 right-0 mr-8 mt-8 cursor-pointer"
                    aria-label="Close Sign In Modal"
                  >
                    <Icon
                      icon="tabler:currency-xrp"
                      className="text-white hover:text-primary text-24 inline-block me-2"
                    />
                  </button>
                  <Signin onSuccess={() => setIsSignInOpen(false)} />
                </div>
              </div>
            )}

            {/* Quick Ban Management Modal */}
            <QuickBanModal
              isOpen={isBanModalOpen}
              onClose={() => setIsBanModalOpen(false)}
            />
          </div>
        </div>
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-midnight_text">
              <Logo />
            </h2>
            <button
              onClick={() => setNavbarOpen(false)}
              className="hover:cursor-pointer"
              aria-label="Close menu Modal"
            >
              <Icon
                icon="tabler:currency-xrp"
                className="text-white text-xl hover:text-primary text-24 inline-block me-2"
              />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4 text-white">
            {Headerdata.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-4 w-full">
              <button
                onClick={() => {
                  setIsBanModalOpen(true);
                  setNavbarOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2.5 rounded-xl font-bold text-sm"
              >
                <Icon icon="solar:shield-warning-bold" className="text-lg" />
                <span>Ban Option</span>
              </button>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <button
                  className="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white"
                  onClick={() => {
                    setIsSignInOpen(true);
                    setNavbarOpen(false);
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

// =====================================================================================================

// signup section removed
