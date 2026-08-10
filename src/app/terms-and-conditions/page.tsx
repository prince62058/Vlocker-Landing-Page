import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | VLocker",
  description: "Terms and Conditions governing the use of VLocker device management and EMI financing services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-body-bg pt-32 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header Banner */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-4">
            User Agreement
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-lightblue/70 text-sm">
            Last Updated: August 2026 | Please read these terms carefully
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-tablebg/40 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-12 shadow-2xl space-y-10 text-lightblue leading-relaxed text-sm md:text-base">
          
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">1. Agreement to Terms</h2>
            <p>
              By accessing the <span className="text-white font-semibold">VLocker</span> website, portal, mobile applications, or by accepting a financed device enrolled under the VLocker Device Management System, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree with any part of these Terms, you may not use the service or enroll a device under this platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">2. Device Financing &amp; EMI Obligations</h2>
            <p>
              When a device is financed through a registered lender, retailer, or NBFC utilizing the VLocker platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lightblue/90">
              <li>
                <strong className="text-white">Timely Payment:</strong> You agree to pay all scheduled Equated Monthly Installments (EMIs) on or before the due dates specified in your loan schedule.
              </li>
              <li>
                <strong className="text-white">Overdue Charges:</strong> Any delayed payment may attract late payment fees and bounce charges as agreed with the financier.
              </li>
              <li>
                <strong className="text-white">Remote Lock Mechanism:</strong> In the event of a defaulted or overdue EMI, VLocker&apos;s automated security system will remotely restrict device functionality (locking calls/apps except emergency dialer and payment portal) until overdue dues are settled.
              </li>
              <li>
                <strong className="text-white">Instant Unlock:</strong> Upon successful payment confirmation via our payment gateway or dealer verification, the device will be unlocked automatically in real time.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">3. Device Security &amp; Anti-Tampering Policy</h2>
            <p>
              To protect the financial asset during the tenure of the loan agreement:
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-sm space-y-2">
              <p className="text-red-300 font-bold">⚠️ Prohibited Activities:</p>
              <ul className="list-disc list-inside space-y-1 text-red-200/80">
                <li>Attempting to remove, disable, or bypass VLocker Device Administrator privileges.</li>
                <li>Rooting, bootloader unlocking, custom ROM flashing, or unauthorized hardware tampering.</li>
                <li>Unauthorized factory reset before full loan clearance.</li>
                <li>Selling, pawning, or transferring ownership of the device prior to loan completion.</li>
              </ul>
              <p className="text-xs text-red-300/70 pt-2">
                Violation of anti-tampering rules may result in immediate permanent device lockdown and legal proceedings by the financing institution.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">4. Payment Processing &amp; Refunds</h2>
            <p>
              All online payments made through the VLocker portal are processed securely via RBI-compliant payment aggregators (including Razorpay):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-lightblue/90">
              <li>Payments are credited towards your specific loan account immediately upon transaction success.</li>
              <li>In case of double deduction or technical payment failure, funds will be refunded by the payment gateway to your original payment method within 5–7 banking days.</li>
              <li>EMI payments once applied to a valid loan balance are non-refundable.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">5. Account Ban &amp; Suspension Policy</h2>
            <p>
              VLocker reserves the right to suspend or ban user access to the portal or services in cases of:
            </p>
            <ul className="list-disc list-inside space-y-1 text-lightblue/90">
              <li>Fraudulent identity submission or payment chargeback abuse.</li>
              <li>Tampering with software security mechanisms.</li>
              <li>Non-compliance with lender contractual guidelines.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">6. Release of Device Management (NOC)</h2>
            <p>
              Upon successful payment of all installments and clearance of all applicable fees, the lender will mark the loan as &quot;CLOSED&quot;. The VLocker administrative lock will be permanently disengaged, releasing full unrestricted control of the device to the customer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-black text-white">7. Limitation of Liability</h2>
            <p>
              VLocker provides the software platform for device management and is not directly a bank or NBFC. VLocker shall not be held liable for indirect, incidental, or consequential damages arising from device lockouts resulting from overdue loan accounts or technical network delays beyond our control.
            </p>
          </section>

          <section className="space-y-3 border-t border-border/60 pt-6">
            <h2 className="text-xl md:text-2xl font-black text-white">8. Contact &amp; Legal Support</h2>
            <p>
              For any legal or contractual inquiries, please reach out to:
            </p>
            <div className="bg-darkmode/70 border border-border rounded-2xl p-5 mt-2 space-y-1">
              <p className="text-white font-bold">VLocker Legal &amp; Grievance Team</p>
              <p className="text-sm">Email: <a href="mailto:support@vlocker.in" className="text-primary underline">support@vlocker.in</a></p>
              <p className="text-sm">Address: Corporate Office, India</p>
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
