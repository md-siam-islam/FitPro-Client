import { Link } from "react-router-dom";
import img from "../../assets/image/Gym-structure-1080x675.png";

const features = [
  {
    title: "Innovation",
    desc: "Cutting-edge solutions for modern challenges",
    icon: (
      <svg className="w-5 h-5 stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    desc: "Long-term thinking for lasting impact",
    icon: (
      <svg className="w-5 h-5 stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    desc: "World-class quality in every delivery",
    icon: (
      <svg className="w-5 h-5 stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Community",
    desc: "Building lasting relationships together",
    icon: (
      <svg className="w-5 h-5 stroke-[#FFB732]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const stats = [
  { num: "500+", label: "Happy Clients" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "50+", label: "Expert Team" },
  { num: "1200+", label: "Projects Completed" },
  { num: "10+", label: "Years of Experience" },
];

const AboutSection = () => {
  return (
    <section className="bg-[#f9f6f1] py-20 px-6 md:px-10 w-full">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left — Image */}
        <div className="flex-1 min-w-0 relative">
          {/* Corner accent */}
          <div className="absolute -top-4 -left-4 w-20 h-20 border-[3px] border-[#FFB732] rounded-xl z-0" />

          <div className="relative rounded-2xl overflow-hidden z-10">
            <img
              src={img}
              alt="About Us"
              className="w-full h-[700px] object-cover rounded-2xl"
            />
          </div>

          {/* Experience badge */}
          <div className="absolute -bottom-8 -right-8 bg-[#FFB732] rounded-xl px-6 py-4 text-center shadow-lg z-20">
            <p className="text-3xl font-bold text-[#1a1000] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
              10+
            </p>
            <p className="text-[10px] font-semibold text-[#5a3d00] uppercase tracking-widest mt-1">
              Years of<br />Excellence
            </p>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 min-w-0 flex flex-col pb-6">
          {/* Tag */}
          <span className="inline-flex items-center gap-2 w-fit mb-5 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#b37800]"
            style={{ background: "rgba(255,183,50,0.12)", border: "1px solid rgba(255,183,50,0.35)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732]" />
            About Our Organization
          </span>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] leading-snug mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            We Are Dedicated To{" "}
            <span className="text-[#FFB732] italic">Your Success</span>
          </h2>
          {/* <div className="w-14 h-[3px] bg-[#FFB732] rounded-full mb-5" /> */}

          <p className="text-[15px] font-light text-[#5a6272] leading-relaxed mb-5">
            We are dedicated to bringing the best services to our clients, focusing on
            innovation, sustainability, and excellence. Our mission is to empower individuals
            and communities to achieve their goals through our tailored solutions.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3 bg-white border border-[#e8e0d0] rounded-xl p-3.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,183,50,0.12)" }}>
                  {f.icon}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1a1a2e]">{f.title}</p>
                  <p className="text-[12px] text-[#8a93a6] leading-snug mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6 py-5 border-t border-b border-[#e8e0d0] mb-7">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-stretch gap-6">
                <div>
                  <p className="text-2xl font-bold text-[#FFB732]"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {s.num}
                  </p>
                  <p className="text-[12px] text-[#8a93a6] mt-0.5">{s.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px bg-[#e8e0d0] self-stretch" />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/classes">
              <button className="bg-[#FFB732] text-[#1a1000] font-medium text-sm px-7 py-3 rounded-full hover:bg-[#e8a420] transition active:scale-95">
                Learn More →
              </button>
            </Link>
            <Link to="/classes">
              <button className="border-[1.5px] border-[#1a1a2e] text-[#1a1a2e] font-normal text-sm px-6 py-3 rounded-full hover:border-[#FFB732] hover:text-[#b37800] transition">
                Our Classes
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;