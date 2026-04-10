import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { 
  FaUser, FaDumbbell, FaTrashAlt, FaSearch, 
  FaStar, FaEnvelope, FaPhone, FaCalendarAlt,
  FaChartLine, FaUsers, FaCheckCircle, FaTimesCircle,
  FaEye, FaDownload, FaFilter
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const AllTrainers = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterExpertise, setFilterExpertise] = useState("all");
  const itemsPerPage = 6;

  const { data: trainers = [], refetch, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/trainer");
      return res.data.filter((trainer) => trainer.role === "trainer");
    },
  });

  // Get unique expertise for filter
  const allExpertise = ["all", ...new Set(trainers.flatMap(t => t.expertise || []))];

  // Filter trainers based on search and expertise
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainer.expertise?.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = filterExpertise === "all" || trainer.expertise?.includes(filterExpertise);
    return matchesSearch && matchesExpertise;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrainers = filteredTrainers.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteTrainer = (id, name) => {
    Swal.fire({
      title: "Remove Trainer?",
      text: `Are you sure you want to remove ${name} from the platform?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosPublic.delete(`/delete-trainer/${id}`)
          .then((res) => {
            if (res?.data?.TrainDelete?.deletedCount > 0) {
              Swal.fire({
                title: "Removed!",
                text: "Trainer has been removed successfully.",
                icon: "success",
                confirmButtonColor: "#FFA500",
                timer: 1500,
              });
              refetch();
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Could not remove the trainer.",
                icon: "error",
                confirmButtonColor: "#FFA500",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting trainer:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
              confirmButtonColor: "#FFA500",
            });
          });
      }
    });
  };

  // Stats
  const totalTrainers = trainers.length;
  const avgExperience = (trainers.reduce((sum, t) => sum + (t.experience || 0), 0) / totalTrainers).toFixed(1);
  const popularExpertise = ["Yoga", "Cardio", "Strength"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-[#FFA500] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaDumbbell className="text-[#FFA500] text-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Dashboard || All Trainers</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Trainer Management</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            All <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Trainers</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage and oversee all fitness trainers on the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Trainers</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalTrainers}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Avg Experience</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{avgExperience}+ yrs</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Expertise Areas</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{allExpertise.length - 1}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaStar className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Status</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{totalTrainers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
                className="pl-11 pr-8 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white appearance-none"
              >
                {allExpertise.map(exp => (
                  <option key={exp} value={exp}>
                    {exp === "all" ? "All Expertise" : exp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Trainers Grid */}
        {paginatedTrainers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTrainers.map((trainer, index) => (
                <div
                  key={trainer._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                >
                  {/* Card Header with Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
                    <img
                      src={trainer.profileImage || trainer.image || "https://via.placeholder.com/400x200?text=Trainer"}
                      alt={trainer.name}
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-medium">Active Trainer</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                          {trainer.name}
                        </h3>
                        <p className="text-sm text-gray-500">{trainer.role || "Trainer"}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs font-medium text-gray-600">4.9</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-orange-500 text-sm" />
                        <span className="text-sm">{trainer.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-orange-500 text-sm" />
                        <span className="text-sm truncate">{trainer.email || "Not provided"}</span>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(trainer.expertise || []).slice(0, 3).map((exp, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {exp}
                        </span>
                      ))}
                      {(trainer.expertise || []).length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{(trainer.expertise || []).length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleDeleteTrainer(trainer._id, trainer.name)}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <FaTrashAlt className="text-sm" />
                      Remove Trainer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-orange-50 border border-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FaUsers className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Trainers Found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTrainers;