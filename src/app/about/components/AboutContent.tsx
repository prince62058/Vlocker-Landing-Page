export default function AboutContent() {
  return (
    <section>
      <div className="container grid md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <h2 className="mb-4">Who We Are</h2>
          <p className="text-lightblue leading-relaxed mb-6">
            VLocker is built with a vision to bring clarity and control to
            loan-based device ownership. We help users track transactions,
            manage EMIs, and secure devices — all in one place.
          </p>

          <p className="text-lightblue leading-relaxed">
            Our platform is designed with simplicity, security, and scalability
            in mind, ensuring a smooth experience for both users and businesses.
          </p>
        </div>

        {/* Right */}
        <div className="bg-darkmode border border-border rounded-2xl p-8 shadow-mentor-shadow">
          <h3 className="text-lightsky text-xl font-semibold mb-4">
            Why Choose VLocker?
          </h3>

          <ul className="space-y-3 text-lightblue text-sm">
            <li>• Transparent transaction tracking</li>
            <li>• Secure loan & EMI management</li>
            <li>• Device-level security integration</li>
            <li>• Clean, modern, user-friendly interface</li>
            <li>• Built for scale and future integrations</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
