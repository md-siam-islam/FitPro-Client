import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  FaUsers, FaUserClock, FaEye, FaClock, 
  FaCheckCircle, FaHourglassHalf, FaSearch,
  FaUserTie, FaEnvelope, FaCalendarAlt
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";

const AppliedTrainer = () => {
  const AxiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/trainer");
      return res.data.filter((trainer) => trainer.status === "pending");
    },
  });

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.expertise?.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingCount = trainers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Dashboard || Applied Trainers</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Applications</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Applied <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Trainers</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Review and manage pending trainer applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending Applications</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <FaUserClock className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Trainers</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Review Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">0%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>
        </div>

        {/* Trainers Grid */}
        {filteredTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                {/* Card Header */}
                <div className="relative h-32 bg-gradient-to-r from-orange-500 to-red-500">
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-60"></div>
                      <img
                        src={trainer.profileImage || "https://via.placeholder.com/100"}
                        alt={trainer.name}
                        className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                      />
                      <div className="absolute bottom-0 right-0 bg-yellow-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-16 pb-5 px-5 text-center">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{trainer.email}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {(trainer.expertise || []).slice(0, 3).map((exp, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-orange-500 text-sm" />
                      <span className="text-sm">{trainer.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaHourglassHalf className="text-yellow-500 text-sm" />
                      <span className="text-sm capitalize">{trainer.status}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/appliedtrainerdetails/${trainer._id}`}>
                  
                    <button className="w-full mt-5 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                      <FaEye className="text-sm" />
                      Review Application
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FaUserTie className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Pending Applications</h3>
            <p className="text-gray-400">All trainer applications have been reviewed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedTrainer;