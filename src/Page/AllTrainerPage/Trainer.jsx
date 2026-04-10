import { useEffect, useState } from "react";
import img from "../../assets/image/img4.jpg";
import { FaFacebook, FaInstagram, FaTwitter, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    AxiosPublic.get("/trainer").then((res) => {
      const filteredTrainers = res.data.filter((item) => item.role === "trainer");
      setTrainers(filteredTrainers);
    });
  }, [AxiosPublic]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>FitPro | Expert Trainers</title>
      </Helmet>

      {/* Hero Section */}
      <div
        className="hero h-[500px] md:h-[600px] relative overflow-hidden"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="hero-overlay bg-black/60"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight">
              Meet Our <span className="text-[#FFA500]">Expert</span> Trainers
            </h1>
            <p className="mb-8 text-lg text-gray-200">
              Personalized guidance from the best in the industry. Our certified trainers are dedicated to transforming your fitness journey into a success story.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block border-b-4 border-[#FFA500] pb-2">
            Our Elite Squad
          </h2>
          <p className="text-gray-500 mt-4">Browse through our professional trainers and choose your mentor.</p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-yellow-400 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-72 ">
                <img
                  src={trainer.profileImage || trainer.image || "https://i.ibb.co/mJR9Qxc/user.png"}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4 text-white text-xl">
                    <a href="#" className="hover:text-[#FFA500] transition-colors"><FaFacebook /></a>
                    <a href="#" className="hover:text-[#FFA500] transition-colors"><FaInstagram /></a>
                    <a href="#" className="hover:text-[#FFA500] transition-colors"><FaTwitter /></a>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#FFA500] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <FaBriefcase className="text-[#FFA500]" /> {trainer.experience} Years Experience
                    </p>
                  </div>
                  <div className="bg-orange-50 text-[#FFA500] p-2 rounded-lg">
                    <FaUserCircle size={24} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                   <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full text-nowrap">Professional Trainer</span>
                   <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full text-nowrap">Fitness Expert</span>
                </div>

                <Link to={`/trainerDetails/${trainer._id}`} className="block">
                  <button className="w-full bg-white border-2 border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    View Profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainer;