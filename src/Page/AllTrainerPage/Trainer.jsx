import { useEffect, useState } from "react";
import img from "../../assets/image/img4.jpg";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const Trainer = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/trainer").then((res) => {
    const filteredTrainers = res.data.filter((item) => item.role === "trainer");
    setTrainers(filteredTrainers);
    });
  }, []);

  return (
    <div>
        <Helmet>
            <title>FitPro | All Trainer Page</title>
        </Helmet>
      <div
        className="hero h-[700px] mb-10"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl font-bold">
              Welcome to Our Trainers Hub
            </h1>
            <p className="mb-5">
              Discover top trainers who are here to guide you towards achieving
              your fitness goals. From expert advice to personalized sessions,
              our trainers are committed to helping you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center underline my-6">All Trainer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl rounded-lg overflow-hidden"
          >
            <figure>
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-2xl font-bold">{trainer.name}</h2>
              <p className="text-gray-600 font-semibold">
                Experience: {trainer.experience} years
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <div>
                    <FaFacebook></FaFacebook>
                  </div>
                  <div>
                    <FaInstagram></FaInstagram>
                  </div>
                  <div>
                    <FaTwitter></FaTwitter>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/trainerDetails/${trainer._id}`}>
                    <button className="btn btn-sm btn-outline bg-[#FFA500] text-white">
                      Know More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
