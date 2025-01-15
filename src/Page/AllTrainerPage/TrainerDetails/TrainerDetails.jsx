import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";

const TrainerDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    AxiosPublic.get(`/trainer/${id}`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.error(err));
  }, [id, AxiosPublic]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>FitPro | {details.name} Details page </title>
      </Helmet>
      <h1 className="text-3xl font-bold my-5 text-center underline">
        {details.name} Details Page
      </h1>
      <div className="p-5 bg-gray-100">
        {/* Trainer Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={details.profileImage}
              alt={details.name}
              className="w-48 h-48 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{details.name}</h1>
              <p className="mb-2">
                <strong>Experience:</strong> {details.experience}
              </p>
              <p className="mb-2">
                <strong>Expertise:</strong> {details.expertise?.join(", ")}
              </p>
              <p className="mb-4">{details.details}</p>
              <div className="flex gap-4">
                {details.socialIcons?.map((icon, index) => (
                  <a
                    key={index}
                    href={`https://www.${icon.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFA500] hover:underline"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.availableSlots?.map((slot, index) => (
              <Link
                key={index}
                to={`/trainerbooked/${details.name}/${slot.day}-${
                  slot.time
                }/${details.expertise.join(",")}`}
              >
                <button className="btn btn-outline bg-[#FFA500] w-full">
                  {slot.day}, {slot.time}
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Be A Trainer Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Joining Us?</h2>
          <p className="mb-4">
            If you are passionate about training and helping others achieve
            their goals, join our team of expert trainers.
          </p>
          <button
            onClick={() => navigate("/become-a-trainer")}
            className="btn bg-[#FFA500]"
          >
            Become a Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
