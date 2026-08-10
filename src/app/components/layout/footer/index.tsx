"use client";

import { Footerlinkdata, Sociallinkdata } from "@/lib/data/pageData";
import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import Link from "next/link";
// import LogoVLocker from "../../../../../../public/images/logo/VLocker_logo5.png";

const Footer = () => {
  return (
    <footer className="bg-body-bg relative pt-10">
      <div className="bg-linear-to-r from-primary to-secondary hidden lg:block absolute w-full h-full top-0 -left-1/2 blur-390"></div>
      <div className="container relative z-10 pb-16">
        <div className="grid grid-cols-1 gap-y-10 md:gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          <div className="lg:col-span-6 sm:col-span-2">
            <Image
              src="/images/logo/VLocker_logo5.png"
              alt="VLocker Logo"
              width={160}
              height={50}
              className="mb-4"
              priority
            />

            <p className="text-white/60 text-sm font-normal max-w-96 leading-7 mb-7">
              {" "}
              VLocker is a smart device financing and management platform that
              enables lenders to track EMIs, control device access, and ensure
              secure, compliance-driven loan operations.
            </p>
            <div className="flex gap-4">
              {Sociallinkdata.map((items, i) => (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href={"#!"}
                  key={i}
                >
                  <img
                    src={items.imgsrc}
                    alt={items.imgsrc}
                    className="hover:opacity-70"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="group relative lg:col-span-2">
            <p className="text-white text-xl font-medium mb-9">Useful Links</p>
            <ul>
              {Footerlinkdata.map((product, i) => (
                <li key={i} className="mb-5">
                  <Link
                    href={product.href}
                    className="text-white/60 text-sm font-normal mb-6 space-links hover:text-primary"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white text-xl font-medium mb-9">Contact Us</p>
            <Link
              href={"tel:(406) 555-012"}
              className="text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit"
            >
              <Image
                src={getImagePath("/images/footer/number.svg")}
                alt="number-icon"
                width={20}
                height={20}
              />
              +91 98765 43210
            </Link>
            <Link
              href={"mailto:tim.jennings@example.com"}
              className="text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit"
            >
              <Image
                src={getImagePath("/images/footer/email.svg")}
                alt="email-icon"
                width={20}
                height={20}
              />
              support@vlocker.in
            </Link>
            <div className="text-white/60 text-sm font-normal mb-6 flex gap-2">
              <Image
                src={getImagePath("/images/footer/address.svg")}
                alt="address-icon"
                width={20}
                height={20}
              />
              Corporate Office, India
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 px-4 border-t border-t-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 container">
        <p className="text-center sm:text-left text-white/70 text-sm">
          © {new Date().getFullYear()} VLocker. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/privacy-policy" className="text-white/60 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms-and-conditions" className="text-white/60 hover:text-primary transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
