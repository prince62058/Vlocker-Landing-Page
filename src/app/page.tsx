
import { Metadata } from "next";

import Banner from "./components/home/hero";
import Services from "./components/home/services";
import Features from "./components/home/features";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";


export const metadata: Metadata = {
  title: "VLocker",
};

export default function Home() {
  return (
    <main>
      <Banner />
      <Services />
      <Features />
      <Faq />
      <ContactForm />

    </main>
  );
}
