export default function AboutDownload() {
  return (
    <section>
      <div className="container text-center">
        {/* <div className="bg-simple-bg rounded-2xl p-12 border border-border"> */}
        <div className="bg-simple-bg rounded-2xl pt-12 pb-12 mb-10 border border-border">
          <h2 className="mb-4">Learn More About VLocker</h2>
          <p className="text-lightblue mb-8 max-w-xl mx-auto">
            Download our brochure to understand how VLocker helps simplify loan
            management and device security.
          </p>

          <a href="https://app.vlocker.in/VLocker.apk" download>
            <button className="bg-linear-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:from-secondary hover:to-primary hover:bg-liner-to-l  cursor-pointer">
              Download Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
