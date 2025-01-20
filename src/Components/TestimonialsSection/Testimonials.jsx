import React, { useEffect, useState } from "react";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";

const Testimonials = () => {
  const AxiosPublic = useAxiosPublic();
  const [review, setReview] = useState([]);

  useEffect(() => {
    AxiosPublic.get("/review")
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
      });
  }, [AxiosPublic]);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center underline mb-6">
        Testimonials Section
      </h1>
      <Swiper
        spaceBetween={30}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {review.length > 0 ? (
          review.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center text-center">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{item.Name}</h2>
                <p className="text-gray-600 text-sm mb-4">{item.email}</p>
                <p className="text-lg mb-4 italic">{item.feedback}</p>
                <ReactStars
                  count={5}
                  edit={false}
                  size={60}
                  value={item.rating}
                  activeColor="#ffd700"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews available.</p>
        )}
      </Swiper>
    </div>
  );
};

export default Testimonials;
