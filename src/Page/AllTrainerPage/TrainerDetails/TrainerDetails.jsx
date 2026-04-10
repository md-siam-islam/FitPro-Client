import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaAward, FaCalendarAlt } from "react-icons/fa";
import bgimg from "../../../assets/image/pexels-cottonbro-4753893.jpg";

const TrainerDetails = () => {
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();

  const { data: trainerDetails = {}, isLoading } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/allTrainer/${id}`);
      return res.data;
    },
  });

  const {
    name,
    profileImage,
    experience,
    expertise,
    socialIcons,
    availableSlots,
    details,
  } = trainerDetails;

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-bars loading-lg text-[#FFA500]"></span></div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>FitPro | {name ? `${name} Profile` : "Trainer Details"}</title>
      </Helmet>

      {/* Header Section */}
      <div className=" text-white pt-28 pb-20 px-4" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <img
              className="w-64 h-80 md:w-80 md:h-96 rounded-2xl object-cover border-4 border-[#FFA500] shadow-2xl"
              src={profileImage}
              alt={name}
            />
            <div className="absolute -bottom-5 -right-5 bg-[#FFA500] text-black px-6 py-3 rounded-lg font-bold shadow-xl">
              {experience}+ Yrs Exp.
            </div>
          </div>

          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {expertise?.map((skill, idx) => (
                <span key={idx} className="bg-orange-500/20 text-[#FFA500] border border-[#FFA500]/30 px-4 py-1 rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-400 max-w-xl leading-relaxed text-lg italic">
              "{details || "Dedicated to helping you reach your peak performance through professional coaching and personalized plans."}"
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-5 mt-8">
              {socialIcons?.map((icon, index) => (
                <a
                  key={index}
                  href={`https://www.${icon.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-[#FFA500] hover:text-black transition-all duration-300 text-xl"
                >
                  {icon.toLowerCase() === 'facebook' && <FaFacebook />}
                  {icon.toLowerCase() === 'instagram' && <FaInstagram />}
                  {icon.toLowerCase() === 'twitter' && <FaTwitter />}
                  {icon.toLowerCase() === 'linkedin' && <FaLinkedin />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Slots Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <FaCalendarAlt className="text-[#FFA500] text-2xl" />
            <h3 className="text-2xl font-bold text-gray-800">Choose Your Training Slot</h3>
          </div>

          {availableSlots && availableSlots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableSlots.map((slot, index) => (
                <Link 
                  key={index} 
                  to={`/trainerbooked/${name}/${slot.day}-${slot.time}/${expertise?.join(",")}`}
                  className="group"
                >
                  <div className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#FFA500] hover:bg-orange-50 transition-all duration-300 cursor-pointer relative overflow-hidden text-center">
                    <p className="font-bold text-gray-800 text-lg uppercase tracking-wider">{slot.day}</p>
                    <p className="text-[#FFA500] font-medium mt-1">{slot.time}</p>
                    <p className="text-sm text-gray-400 mt-2 italic">{slot.name || 'Available Session'}</p>
                    <div className="absolute bottom-0 right-0 left-0 h-1 bg-[#FFA500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg italic">No slots available right now. Please check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-[#FFA500] to-[#ff8c00] rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <FaAward size={200} />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">Interested in Joining Our Team?</h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto relative z-10">
            If you are a certified trainer and passionate about changing lives, we’d love to have you on board!
          </p>
          <Link to={"/becometrainer"} className="relative z-10">
            <button className="bg-black text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-1">
              Become a FitPro Trainer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;