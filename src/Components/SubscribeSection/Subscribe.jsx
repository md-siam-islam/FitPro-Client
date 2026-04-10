import React from "react";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";

const Subscribe = () => {
  const AxiosPublic = useAxiosPublic();

  const handleSubscription = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    AxiosPublic.post("/newslate", { name, email }).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "You have subscribed successfully.",
          icon: "success",
        });
        event.target.reset();
      }
    });
  };

  return (
    <section
      className="relative py-20 px-6 w-full overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div
        className="absolute -top-24 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(255,183,50,0.06)" }}
      />
      <div
        className="absolute -bottom-16 -left-10 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "rgba(255,183,50,0.05)" }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center">

        {/* Tag */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#FFB732] mb-5"
          style={{
            background: "rgba(255,183,50,0.12)",
            border: "1px solid rgba(255,183,50,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732] animate-pulse" />
          Newsletter
        </span>

        {/* Title */}
        <h2
          className="text-4xl font-bold text-[#f5f0e8] mb-4 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Stay in the{" "}
          <span className="text-[#FFB732] italic">Loop</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[14.5px] font-light text-[#7a8394] leading-relaxed mb-10">
          Subscribe to get the latest workout tips, class schedules, and exclusive
          offers delivered straight to your inbox.
        </p>

        {/* Form */}
        <form onSubmit={handleSubscription} className="flex flex-col gap-3.5">

          {/* Name input */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[#4a5568] pointer-events-none"
              fill="none" strokeWidth="1.8" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              required
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-[#f5f0e8] placeholder-[#4a5568] outline-none transition-all duration-200 focus:border-[#FFB732]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,183,50,0.5)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.background = "rgba(255,255,255,0.05)";
              }}
            />
          </div>

          {/* Email input */}
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[#4a5568] pointer-events-none"
              fill="none" strokeWidth="1.8" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-[#f5f0e8] placeholder-[#4a5568] outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,183,50,0.5)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
                e.target.style.background = "rgba(255,255,255,0.05)";
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-medium text-[#1a1000] bg-[#FFB732] hover:bg-[#e8a420] active:scale-[0.98] transition-all duration-200 mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Subscribe Now →
          </button>
        </form>

        {/* Note */}
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-[#4a5568] mt-5">
          <svg className="w-3.5 h-3.5 stroke-[#4a5568]" fill="none" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Subscribe;