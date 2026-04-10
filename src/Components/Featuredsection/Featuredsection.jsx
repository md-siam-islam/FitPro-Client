import React from "react";

const features = [
  {
    num: "01",
    title: "User-Friendly Interface",
    desc: "Easily navigate through our platform with a clean and intuitive interface designed for everyone.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Seamless Navigation",
    desc: "Enjoy seamless navigation with easy-to-access features across all your devices.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Secure Environment",
    desc: "Protect your data with our state-of-the-art security features and encrypted systems.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Customizable Settings",
    desc: "Adjust settings to your preferences with our flexible and easy-to-use customization options.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Multi-Platform Support",
    desc: "Our application works seamlessly across different devices, platforms and screen sizes.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Advanced Analytics",
    desc: "Track your progress with detailed insights and performance reports to stay on top of your goals.",
    icon: (
      <svg className="w-[22px] h-[22px] stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const Featuredsection = () => {
  return (
    <section
      className="relative py-20 px-6 w-full overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Orbs */}
      <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(255,183,50,0.05)" }} />
      <div className="absolute -bottom-12 -left-10 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "rgba(255,183,50,0.04)" }} />

      {/* Header */}
      <div className="relative z-10 text-center mb-14">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#FFB732] mb-4"
          style={{ background: "rgba(255,183,50,0.12)", border: "1px solid rgba(255,183,50,0.3)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732] animate-pulse" />
          Why Choose Us
        </span>

        <h2
          className="text-4xl font-bold text-[#f5f0e8] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Everything You Need to{" "}
          <span className="text-[#FFB732] italic">Succeed</span>
        </h2>

        <p className="text-[14.5px] font-light text-[#7a8394] max-w-md mx-auto leading-relaxed mb-4">
          Powerful features designed to help you achieve your fitness goals faster and smarter.
        </p>
        <div className="w-14 h-[3px] bg-[#FFB732] rounded-full mx-auto" />
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.num}
            className="group relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,183,50,0.25)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            {/* Top gold bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FFB732] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Ghost number */}
            <span
              className="absolute top-4 right-5 text-[42px] font-bold leading-none select-none pointer-events-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "rgba(255,183,50,0.06)",
              }}
            >
              {f.num}
            </span>

            {/* Icon */}
            <div
              className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
              style={{
                background: "rgba(255,183,50,0.10)",
                border: "0.5px solid rgba(255,183,50,0.2)",
              }}
            >
              {f.icon}
            </div>

            {/* Text */}
            <h3
              className="text-[17px] font-bold text-[#f5f0e8] mb-2.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {f.title}
            </h3>
            <p className="text-[13.5px] font-light text-[#7a8394] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featuredsection;