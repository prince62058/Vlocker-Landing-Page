import { FaqType } from "@/app/types/faq";
import { FeatureType } from "@/app/types/features";
import { FooterType } from "@/app/types/footerlink";
import { HeaderItem } from "@/app/types/menu";
import { SocialType } from "@/app/types/sociallink";
import { WorkType } from "@/app/types/work";

export const Headerdata: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services-section" },
  { label: "Features", href: "/#features-section" },
  // { label: "FAQ", href: "/#faq-section" },
  // { label: "Contact Us", href: "/#contact" },
  { label: "Docs", href: "/documentation" },
  { label: "Transactions", href: "/transactions" },
  { label: "About Us", href: "/about" },
];

const basePath = ""; // Hardcoded base path

export const Companiesdata: { imgSrc: string }[] = [
  {
    imgSrc: `${basePath}/images/companies/birdseye.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/break.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/keddar.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/shield.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/tandov.svg`,
  },
  {
    imgSrc: `${basePath}/images/companies/tree.svg`,
  },
];

export const workdata: WorkType[] = [
  {
    imgSrc: `${basePath}/images/work/icon-one.svg`,
    heading: "Create Account",
    subheading:
      "Sign up with your email, set up a secure password, and verify your identity to unlock full access to the platform. Getting started takes just a few minutes.",
  },
  {
    imgSrc: `${basePath}/images/work/icon-two.svg`,
    heading: "Add Funds",
    subheading:
      "Deposit money using your preferred payment method — bank transfer, debit card, or crypto wallet — and get ready to explore the world of digital assets.",
  },
  {
    imgSrc: `${basePath}/images/work/icon-three.svg`,
    heading: "Buy, Sell & Exchange",
    subheading:
      "Easily buy or sell cryptocurrencies like Bitcoin and Ethereum, or convert between coins — all with real-time rates and low transaction fees.",
  },
];

export const Featuresdata: FeatureType[] = [
  {
    imgSrc: `${basePath}/images/features/featureOne.svg`,
    heading: "Secure Device Locking",
    subheading:
      "Automatically lock or unlock financed devices based on EMI payment status, ensuring security and payment compliance.",
  },
  {
    imgSrc: `${basePath}/images/features/featureTwo.svg`,
    heading: "Real-Time EMI Tracking",
    subheading:
      "Monitor installment schedules, payment history, and pending EMIs in real time with complete visibility and control.",
  },
  {
    imgSrc: `${basePath}/images/features/featureThree.svg`,
    heading: "Centralized Loan Management",
    subheading:
      "Manage customers, devices, and transactions from a single dashboard built for lenders and financial partners.",
  },
];

export const Faqdata: FaqType[] = [
  {
    heading: "1. What is VLocker?",
    subheading:
      "VLocker is a smart device financing and management platform that helps lenders track EMIs, manage device-based loans, and automatically lock or unlock devices based on payment status.",
  },
  {
    heading: "2. How does device locking work?",
    subheading:
      "When a customer misses an EMI, VLocker can remotely restrict device access. Once the payment is completed, the device is automatically unlocked, ensuring payment compliance and asset security.",
  },
  {
    heading: "3. Who can use the VLocker platform?",
    subheading:
      "VLocker is designed for lenders, financial institutions, retailers, and partners offering device-based financing. The admin panel provides complete control over customers, loans, EMIs, and devices.",
  },
];

export const Sociallinkdata: SocialType[] = [
  {
    imgsrc: `${basePath}/images/footer/insta.svg`,
    href: "https://instagram.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/dribble.svg`,
    href: "https://dribble.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/twitter.svg`,
    href: "https://twitter.com/",
  },
  {
    imgsrc: `${basePath}/images/footer/youtube.svg`,
    href: "https://youtube.com/",
  },
];

export const Footerlinkdata: FooterType[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Documentation", href: "/documentation" },
  { label: "Services", href: "/#services-section" },
  { label: "Features", href: "/#features-section" },
];
