import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  FaSearch, FaClock, FaInfoCircle, FaChevronLeft, FaChevronRight, 
  FaDumbbell, FaUsers, FaStar, FaFire, FaCalendarAlt, FaArrowRight,
  FaUserTie, FaMedal, FaQuoteLeft, FaHeartbeat
} from "react-icons/fa";

const AllClasses = () => {
  const AxiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);

  const {
    data: paginatedClasses = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paginatedClasses", searchQuery, currentPage],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/newclass?page=${currentPage}&limit=6&q=${searchQuery}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { classes = [], totalPages = 1 } = paginatedClasses;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    AxiosPublic.get('/trainer')
      .then((res) => {
        const filterTrainer = res.data.filter((trainer) => trainer.role === "trainer")
        setTrainers(filterTrainer)
      })
  }, [AxiosPublic])

  const openModal = (classInfo) => {
    setSelectedClass(classInfo);
    document.getElementById("trainer_modal").showModal();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 border-t-[#FFA500] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaDumbbell className="text-[#FFA500] text-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitPro || All Classes</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
              <FaFire className="text-[#FFA500] text-sm" />
              <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Transform Your Life</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Premium Classes
              </span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-8">
              Discover world-class fitness classes led by expert trainers. Your journey to a better you starts here.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search by class name, duration, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-xl bg-white focus:ring-2 focus:ring-[#FFA500] transition-all text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <FaUsers className="text-[#FFA500] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">50+</div>
            <div className="text-xs text-gray-500">Active Classes</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <FaUserTie className="text-[#FFA500] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">20+</div>
            <div className="text-xs text-gray-500">Expert Trainers</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <FaStar className="text-[#FFA500] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">4.9</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <FaHeartbeat className="text-[#FFA500] text-2xl mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">10K+</div>
            <div className="text-xs text-gray-500">Happy Members</div>
          </div>
        </div>

        {/* Classes Grid */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classInfo, index) => (
              <div
                key={classInfo._id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Featured
                </div>
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={classInfo.classImage}
                    alt={classInfo.className}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        <FaQuoteLeft className="text-orange-400" />
                        Join now and transform your life!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                      {classInfo.category || "Fitness"}
                    </span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-xs text-gray-600">4.8</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FFA500] transition-colors line-clamp-1">
                    {classInfo.className}
                  </h2>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {classInfo.details}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaClock className="text-[#FFA500] text-xs" />
                      <span className="text-xs font-medium">{classInfo.Duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendarAlt className="text-[#FFA500] text-xs" />
                      <span className="text-xs font-medium">Weekly</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal(classInfo)}
                    className="group/btn w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Trainers
                    <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6">
              <FaSearch className="text-[#FFA500] text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No classes found</h3>
            <p className="text-gray-400">Try adjusting your search or browse all classes</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-16 gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 shadow-sm"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map((page) => {
                // Show only 5 pages at a time
                if (
                  page + 1 === 1 ||
                  page + 1 === totalPages ||
                  (page + 1 >= currentPage - 1 && page + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page + 1}
                      onClick={() => handlePageChange(page + 1)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                        currentPage === page + 1
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                          : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
                      }`}
                    >
                      {page + 1}
                    </button>
                  );
                }
                if (page + 1 === currentPage - 2 || page + 1 === currentPage + 2) {
                  return <span key={page} className="w-10 h-10 flex items-center justify-center">...</span>;
                }
                return null;
              })}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 shadow-sm"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Premium Trainer Modal */}
      <dialog id="trainer_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-6xl rounded-3xl p-0 bg-white overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <h3 className="text-2xl font-bold text-white">
              Expert Trainers
            </h3>
            <p className="text-orange-100 mt-1">
              for <span className="font-semibold">{selectedClass?.className}</span>
            </p>
          </div>
          
          {/* Modal Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {trainers
                .filter((trainer) => trainer?.expertise?.includes(selectedClass?.className || ''))
                .slice(0, 6)
                .map((trainer) => (
                  <Link 
                    to={`/trainerDetails/${trainer._id}`} 
                    key={trainer._id} 
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 border border-gray-100 hover:border-orange-200"
                  >
                    <div className="relative">
                      <img
                        src={trainer.profileImage}
                        alt={trainer.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white group-hover:ring-orange-300 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {trainer.name}
                        </h4>
                        <FaMedal className="text-orange-400 text-sm" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Certified Professional</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {trainer.expertise?.slice(0, 2).map((exp, i) => (
                          <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-600">
                            {exp}
                          </span>
                        ))}
                        {trainer.expertise?.length > 2 && (
                          <span className="text-[10px] text-gray-400">+{trainer.expertise.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {trainers.filter((trainer) => trainer?.expertise?.includes(selectedClass?.className || '')).length === 0 && (
              <div className="text-center py-12">
                <FaUserTie className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">No trainers available for this class yet.</p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-100 bg-gray-50">
            <form method="dialog">
              <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-all">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FFA500;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff8c00;
        }
      `}</style>
    </div>
  );
};

export default AllClasses;