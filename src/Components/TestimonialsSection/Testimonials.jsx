import React, { useEffect, useState } from "react";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const AxiosPublic = useAxiosPublic();
  const [review, setReview] = useState([]);

  useEffect(() => {
    AxiosPublic.get("/review")
      .then((res) => setReview(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, [AxiosPublic]);

  return (
    <section className="py-20 px-6 w-full" style={{ background: "#f9f6f1" }}>

      {/* Header */}
      <div className="text-center mb-14">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#b37800] mb-4"
          style={{ background: "rgba(255,183,50,0.12)", border: "1px solid rgba(255,183,50,0.35)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732]" />
          Testimonials
        </span>
        <h2
          className="text-4xl font-bold text-[#1a1a2e] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Our <span className="text-[#FFB732] italic">Members</span> Say
        </h2>
        <p className="text-[14.5px] font-light text-[#7a8394] max-w-md mx-auto leading-relaxed mb-4">
          Real stories from real people who transformed their lives with us.
        </p>
        <div className="w-14 h-[3px] bg-[#FFB732] rounded-full mx-auto" />
      </div>

      {/* Swiper */}
      <div className="max-w-2xl mx-auto">
        <Swiper
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="testimonial-swiper"
        >
          {review.length > 0 ? (
            review.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className="bg-white rounded-2xl px-10 py-10 flex flex-col items-center text-center relative mb-10"
                  style={{ border: "0.5px solid #ece8e0" }}
                >
                  {/* Quote mark */}
                  <span
                    className="absolute top-6 left-8 text-[80px] leading-none text-[#FFB732] opacity-20 select-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "
                  </span>

                  {/* Avatar */}
                  <div
                    className="w-[88px] h-[88px] rounded-full p-[3px] mb-5"
                    style={{ border: "3px solid #FFB732" }}
                  >
                    <img
                      src={item.photo}
                      alt={item.Name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-xl font-bold text-[#1a1a2e] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.Name}
                  </h3>

                  {/* Email */}
                  <p className="text-[12px] text-[#b0b8c8] mb-4">{item.email}</p>

                  {/* Stars */}
                  <div className="mb-5">
                    <ReactStars
                      count={5}
                      edit={false}
                      size={26}
                      value={item.rating}
                      activeColor="#FFB732"
                    />
                  </div>

                  {/* Feedback */}
                  <p className="text-[15px] font-light text-[#5a6272] leading-relaxed italic max-w-lg">
                    "{item.feedback}"
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p className="text-center text-[#7a8394] py-10">No reviews available.</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Custom Swiper styles */}
      <style>{`
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          width: 42px;
          height: 42px;
          background: #1a1a2e;
          border-radius: 10px;
          color: #FFB732;
          top: 44%;
        }
        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          background: #FFB732;
          color: #1a1000;
        }
        .testimonial-swiper .swiper-button-next::after,
        .testimonial-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 700;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          background: #d0ccc4;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #FFB732;
          width: 22px;
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;