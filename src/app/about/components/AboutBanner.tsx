

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background watermark */}
      <div 
        className="
              absolute inset-0 
              about-bg 
              opacity-8
              bg-[length:75rem_21rem]
              bg-[position:center_60%]
          "
        ></div>

      {/* Content */}
      <div className="relative z-10 container py-28 text-center">
        <h1>About VLocker</h1>
        <p className="text-lightblue max-w-2xl mx-auto mt-4">
          VLocker helps secure devices and manage loans with trust, transparency,
          and technology.
        </p>
      </div>
    </section>
  );
}
