export const Documentation = () => {
    return (
        <div className="bg-body-bg md:pt-0 pt-12">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) p-6 lg:pt-44 pt-16">
                {/* Page Title */}
                <div className="text-center mb-16">
                    <h1 className="text-white text-4xl font-bold mb-4">
                        VLocker Documentation
                    </h1>
                    <p className="text-lightblue text-lg">
                        Everything you need to know about using VLocker securely and
                        efficiently.
                    </p>
                </div>

                {/* About VLocker */}
                <section className="mb-14">
                    <h2 className="text-lightsky text-2xl font-semibold mb-4">
                        What is VLocker?
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        VLocker is a secure digital platform designed to manage device-based
                        loans and EMI tracking. It helps users and organizations monitor
                        device status, payment schedules, and access control in a single,
                        centralized system.
                    </p>
                </section>

                {/* Required Documents */}
                <section className="mb-14">
                    <h2 className="text-lightsky text-2xl font-semibold mb-4">
                        Documents Required
                    </h2>
                    <ul className="list-disc list-inside text-white/70 space-y-2">
                        <li>Valid mobile number (OTP based login)</li>
                        <li>Government-issued ID (Aadhaar / PAN / Driving License)</li>
                        <li>Device purchase invoice or IMEI number</li>
                        <li>Loan or EMI agreement (if applicable)</li>
                    </ul>
                </section>

                {/* How It Works */}
                <section className="mb-14">
                    <h2 className="text-lightsky text-2xl font-semibold mb-4">
                        How VLocker Works
                    </h2>
                    <ol className="list-decimal list-inside text-white/70 space-y-2">
                        <li>Sign in using your registered mobile number</li>
                        <li>Verify access via OTP</li>
                        <li>View linked devices and EMI schedules</li>
                        <li>Track payment status and device lock state</li>
                        <li>Manage actions securely from the dashboard</li>
                    </ol>
                </section>

                {/* Security Note */}
                <section className="mb-20">
                    <h2 className="text-lightsky text-2xl font-semibold mb-4">
                        Security & Privacy
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        VLocker follows strict security practices. All sensitive data is
                        encrypted, OTP-based authentication is enforced, and device actions
                        are logged to ensure transparency and safety.
                    </p>
                </section>
            </div>
        </div>
    );
};
