
"use client";

import Image from "next/image";
import { getImagePath } from "@/lib/utils/imagePath";

const Banner = () => {
  return (
    <section id="home-section" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="bg-banner-image absolute inset-0 blur-390"></div>

      <div className="container relative z-10 lg:pt-24 pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          {/* Left Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <h1 className="mb-6 leading-tight">
              Smart Device Financing.
              <br />
              Secure Payments.
              <br />
              Total Control.
            </h1>

            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto lg:mx-0">
              VLocker empowers lenders with real-time EMI tracking, automated
              device locking, and complete loan visibility — built for scale,
              security, and control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="px-10 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition">
                Get Started
              </button>

              <a
                href="#features-section"
                className="text-white/80 hover:text-primary transition text-lg font-medium"
              >
                View Features →
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <Image
              src={getImagePath("/images/logo/VLocker_logo5.png")}
              // src={getImagePath("/images/logo/VLocker_Logo2.png")}
              alt="VLocker App Preview"
              width={800}
              height={1000}
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
