import { Metadata } from "next";
import AboutBanner from "./components/AboutBanner";
import AboutContent from "./components/AboutContent";
import AboutDownload from "./components/AboutDownload";

export const metadata: Metadata = {
  title: "About Us | VLocker",
};

export default function AboutPage() {
  return (
    <main>
      <AboutBanner />
      <AboutContent />
      <AboutDownload />
    </main>
  );
}
