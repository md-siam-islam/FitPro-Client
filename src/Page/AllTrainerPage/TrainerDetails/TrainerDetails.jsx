import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const TrainerDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();
  const [fitUser , setFitUser] =useState()
  console.log(fitUser);

  const { data: trainerDetails = {} } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/allTrainer/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    AxiosPublic.get('/user')
    .then((res) => {
      setFitUser(res.data)
    })
  },[])

  // Destructuring trainer details
  const {
    name,
    profileImage,
    experience,
    expertise,
    socialIcons,
    availableSlots,
    details,
  } = trainerDetails;


  return (
    <div>
      <Helmet>
        <title>FitPro | {name ? `${name} Details` : "Details Page"}</title>
      </Helmet>

      {/* Page Title */}
      <h1 className="text-center text-3xl font-bold underline mb-5">
        {name ? `${name} Details Page` : "Trainer Details"}
      </h1>

      {/* Trainer Details */}
      <div className="flex flex-col lg:flex-row items-start gap-8 p-5 bg-gray-100 rounded-lg shadow-md">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            className="w-64 h-64 rounded-xl object-cover"
            src={profileImage}
            alt={name}
          />
        </div>

        {/* Trainer Info */}
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-3">Name: {name}</h2>
          <p className="text-lg mb-2">
            <strong>Experience:</strong> {experience || "Not Available"}
          </p>
          <p className="text-lg mb-2">
            <strong>Expertise:</strong> {expertise?.join(", ") || "General"}
          </p>
          <p className="text-md text-gray-700 mb-4">{details}</p>

          {/* Social Icons */}
          {socialIcons && (
            <div className="flex gap-4">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={`https://www.${icon.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Slots */}
      {availableSlots && availableSlots.length > 0 && (
        <div className="mt-8 p-5 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Available Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSlots?.map((slot, index) => (
              <Link to={`/trainerbooked/${name}/${slot.day}-${slot.time}/${expertise.join(",")}`}><button
              key={index}
              className="btn btn-outline bg-orange-500 text-white rounded-md px-4 py-2"
            >
              {slot.day}, {slot.time}
            </button></Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in Joining Us?</h2>
        <p className="mb-4">
          If you are passionate about training and helping others achieve their
          goals, join our team of expert trainers.
        </p>

        <Link to={"/becometrainer"}>
          <button className="btn bg-[#FFA500]">Become a Trainer</button>
        </Link>
        
      </div>
      
    </div>
  );
};

export default TrainerDetails;
