import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | VLocker",
  description: "Learn how VLocker collects, protects, and handles your data for device financing and EMI security management.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-body-bg pt-32 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header Banner */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4">
            Legal & Compliance
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lightblue/70 text-sm">
            Last Updated: August 2026 | Effective Immediately
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-tablebg/40 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-12 shadow-2xl space-y-10 text-lightblue leading-relaxed text-sm md:text-base">
          
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">1. Introduction</h2>
            <p>
              Welcome to <span className="text-white font-semibold">VLocker</span> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web platform, mobile applications, and device financing management services.
            </p>
            <p>
              By accessing or using VLocker, you consent to the data collection and usage practices described in this Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white">2. Information We Collect</h2>
            <p>
              In order to provide secure EMI tracking and device lock/unlock automation for financed devices, we may collect the following types of information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-darkmode/60 border border-border/50 rounded-2xl p-5">
                <h3 className="text-white font-bold text-base mb-2">👤 Personal & Contact Data</h3>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-lightblue/80">
                  <li>Full Name</li>
                  <li>Mobile Phone Number (for OTP login)</li>
                  <li>Email Address</li>
                  <li>Billing and Residential Address</li>
                  <li>Identity verification details (if provided by lender)</li>
                </ul>
              </div>

              <div className="bg-darkmode/60 border border-border/50 rounded-2xl p-5">
                <h3 className="text-white font-bold text-base mb-2">📱 Device & Technical Data</h3>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-lightblue/80">
                  <li>Device Model and Manufacturer</li>
                  <li>IMEI Number (IMEI 1 &amp; IMEI 2) and Serial Number</li>
                  <li>Device IP address, Network State, and OS version</li>
                  <li>App Version &amp; FCM Push Notification Tokens</li>
                  <li>Device lock/unlock status &amp; provisioning logs</li>
                </ul>
              </div>
            </div>
            <div className="bg-darkmode/60 border border-border/50 rounded-2xl p-5">
              <h3 className="text-white font-bold text-base mb-2">💳 Loan & Financial Information</h3>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-lightblue/80">
                <li>Loan ID, Principal Amount, and EMI installment schedules</li>
                <li>Due dates, payment records, and overdue status</li>
                <li>Transaction reference IDs (payment card/UPI details are securely processed by RBI-licensed payment gateways and not stored on our servers)</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">3. How We Use Your Information</h2>
            <p>We process your data for the following lawful purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-lightblue/90">
              <li>To provide seamless authentication and secure OTP-based login.</li>
              <li>To track and display real-time loan installments, overdue charges, and payment histories.</li>
              <li>To execute automated device locking for overdue EMIs and instantaneous device unlocking upon successful payment clearance.</li>
              <li>To send critical transaction alerts, EMI reminders, and push notifications via Firebase Cloud Messaging.</li>
              <li>To prevent fraud, unauthorized factory resets, device tampering, and abuse of financing agreements.</li>
              <li>To comply with regulatory obligations and provide customer support.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">4. Device Administrator &amp; Knox Permissions</h2>
            <p>
              VLocker’s client application functions as a <span className="text-white font-semibold">Device Owner / Device Administrator</span> under Android enterprise guidelines.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-sm">
              <p className="text-white font-bold mb-1">Purpose of Elevated Privileges:</p>
              <p className="text-lightblue/90">
                These permissions are strictly utilized to prevent unauthorized bypass of loan agreements (e.g. disabling hardware keys, preventing factory reset without lender consent, and displaying payment reminder screens when installments are overdue). We do <strong>not</strong> access your private personal files, photos, contacts, or messages.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">5. Data Sharing &amp; Third-Party Services</h2>
            <p>We do not sell your personal data. We only share information with trusted third parties necessary for operations:</p>
            <ul className="list-disc list-inside space-y-1.5 text-lightblue/90">
              <li><span className="text-white font-semibold">Payment Gateways (Razorpay):</span> To process secure UPI, Net Banking, and Card payments.</li>
              <li><span className="text-white font-semibold">Lending Partners &amp; Retailers:</span> To sync loan status, EMI payments, and customer device verification.</li>
              <li><span className="text-white font-semibold">Cloud Infrastructure (AWS, DigitalOcean, MongoDB Atlas):</span> To securely host database records and encrypted backups.</li>
              <li><span className="text-white font-semibold">Notification Providers (Firebase, Fast2SMS):</span> To deliver OTPs and critical EMI status notifications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">6. Data Security &amp; Retention</h2>
            <p>
              We implement industry-standard encryption (HTTPS/TLS 1.3 in transit and AES-256 at rest) to protect your information. Your data is retained for the duration of the loan lifecycle and as required by financial auditing regulations. Once a loan is fully cleared, device lock privileges are permanently released.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">7. Your Rights</h2>
            <p>
              Subject to applicable legal and contractual conditions under your device financing agreement, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-lightblue/90">
              <li>View your active loan schedules, payment logs, and device status.</li>
              <li>Request correction of inaccurate contact information.</li>
              <li>Receive immediate confirmation upon full loan repayment.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <h2 className="text-xl md:text-2xl font-black text-white">8. Contact Us &amp; Grievance Redressal</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our support desk:
            </p>
            <div className="bg-darkmode/70 border border-border rounded-2xl p-5 mt-2 space-y-1">
              <p className="text-white font-bold">VLocker Security &amp; Compliance</p>
              <p className="text-sm">Email: <a href="mailto:support@vlocker.in" className="text-primary underline">support@vlocker.in</a></p>
              <p className="text-sm">Support Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
            </div>
          </section>

        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-3 rounded-2xl font-bold transition-all border border-white/10"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
