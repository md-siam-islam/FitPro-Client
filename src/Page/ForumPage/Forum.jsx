import React, { useState } from "react";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import AdminBadge from "../../assets/image/Admi Badge.jpg";
import TrainerBadge from "../../assets/image/Trainer.png";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { 
  FaArrowUp, FaChevronLeft, FaChevronRight, FaUsers, 
  FaComments, FaThumbsUp, FaFire, FaTrophy, FaMedal,
  FaQuoteLeft, FaHashtag, FaRocket
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Forum = () => {
  const AxiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paginatedClasses = {}, isLoading, refetch } = useQuery({
    queryKey: ["paginatedClasses", currentPage],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/newpost?page=${currentPage}&limit=6`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { classes = [], totalPages = 1 } = paginatedClasses;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 border-t-[#FFA500] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaComments className="text-[#FFA500] text-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const handleVoteForum = (id) => {
    AxiosPublic.post(`/updatevote/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Vote Recorded!",
          text: "Thank you for your contribution to the community.",
          showConfirmButton: false,
          timer: 1500,
          background: "#ffffff",
          customClass: {
            popup: "rounded-2xl",
          },
        });
        refetch();
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50/30 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-2xl"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-6 shadow-lg">
              <HiSparkles className="text-white text-sm" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Community Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
              FitPro <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Forum</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-4">
              Knowledge sharing by our experts. Stay updated with the latest fitness tips, nutrition guides, and community discussions.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <FaUsers className="text-[#FFA500] text-sm" />
                <span className="text-sm text-gray-600">2,500+ Active Members</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <FaComments className="text-[#FFA500] text-sm" />
                <span className="text-sm text-gray-600">1,200+ Discussions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FaFire className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{classes.length * 12}+</div>
            <div className="text-xs text-gray-500">Total Posts</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FaTrophy className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-gray-800">24/7</div>
            <div className="text-xs text-gray-500">Expert Support</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FaThumbsUp className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-gray-800">98%</div>
            <div className="text-xs text-gray-500">Satisfaction</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FaRocket className="text-white text-xl" />
            </div>
            <div className="text-2xl font-bold text-gray-800">Daily</div>
            <div className="text-xs text-gray-500">New Content</div>
          </div>
        </div>

        {/* Posts Grid */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((item, index) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Top Border */}
                <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
                
                <div className="p-8 flex flex-col h-full">
                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-60"></div>
                      <img 
                        src={item.Badge === "Admin" ? AdminBadge : TrainerBadge} 
                        alt="Badge" 
                        className="relative w-14 h-14 rounded-full border-2 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">{item.Badge}</h4>
                        {item.Badge === "Admin" ? (
                          <FaMedal className="text-orange-500 text-sm" />
                        ) : (
                          <FaTrophy className="text-orange-500 text-sm" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        {item.Badge === "Admin" ? "Community Manager" : "Certified Expert"}
                      </p>
                    </div>
                  </div>

                  {/* Title with icon */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaHashtag className="text-orange-400 text-sm" />
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        Trending Topic
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-[#FFA500] transition-colors line-clamp-2">
                      {item.Title}
                    </h2>
                  </div>

                  {/* Description with quote icon */}
                  <div className="relative mb-6 flex-grow">
                    <FaQuoteLeft className="absolute -top-1 -left-1 text-orange-200 text-2xl opacity-50" />
                    <p className="text-gray-500 leading-relaxed line-clamp-4 pl-6">
                      {item.Description}
                    </p>
                  </div>

                  {/* Interaction Footer */}
                  <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <FaThumbsUp className="text-gray-300 text-sm" />
                        <span className="text-xs text-gray-400 font-medium">Impact Score</span>
                      </div>
                      <div className="bg-gradient-to-r from-orange-100 to-red-100 text-[#FFA500] px-4 py-2 rounded-xl font-black text-xl shadow-inner">
                        {item.vote || 0}
                      </div>
                    </div>

                    <button
                      onClick={() => handleVoteForum(item._id)}
                      className="group/btn flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95"
                    >
                      <FaArrowUp className="text-sm group-hover/btn:-translate-y-1 transition-transform" />
                      <span>Upvote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-6">
              <FaComments className="text-[#FFA500] text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-400">Be the first to share your knowledge!</p>
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-16 gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-4 bg-white rounded-2xl border border-orange-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 shadow-md"
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map((page) => {
                if (
                  page + 1 === 1 ||
                  page + 1 === totalPages ||
                  (page + 1 >= currentPage - 1 && page + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page + 1}
                      onClick={() => setCurrentPage(page + 1)}
                      className={`w-12 h-12 rounded-2xl font-bold transition-all shadow-md ${
                        currentPage === page + 1
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110 shadow-lg"
                          : "bg-white text-gray-600 hover:bg-orange-50 border border-orange-200"
                      }`}
                    >
                      {page + 1}
                    </button>
                  );
                }
                if (page + 1 === currentPage - 2 || page + 1 === currentPage + 2) {
                  return <span key={page} className="w-12 h-12 flex items-center justify-center text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-4 bg-white rounded-2xl border border-orange-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Forum;