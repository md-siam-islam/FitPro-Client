import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { 
  FaUser, FaDumbbell, FaCalendarAlt, FaDollarSign, 
  FaStar, FaComment, FaTimes, FaCheckCircle,
  FaClock, FaUserTie, FaCrown, FaFire
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Bookedpage = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [bookedTrainer, setBookedTrainer] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (user?.email) {
      AxiosPublic.get(`/payment/${user?.email}`)
        .then((res) => {
          setBookedTrainer(res.data);
        })
        .catch((error) => console.error(error));
    }
  }, [AxiosPublic, user?.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      feedback,
      rating,
      Name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      trainerName: selectedBooking?.TrainerName,
      packageName: selectedBooking?.packageName,
    };

    AxiosPublic.post("/review", reviewData).then((res) => {
      if (res.data.insertedId) {
        document.getElementById("review_modal").close();
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your review has been submitted successfully",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          customClass: {
            popup: "rounded-2xl",
          },
        });
        setFeedback("");
        setRating(0);
        setSelectedBooking(null);
      }
    });
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    document.getElementById("review_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("review_modal").close();
    setFeedback("");
    setRating(0);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">My Bookings</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Training Sessions</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Track your booked sessions and share your experience with our expert trainers
          </p>
        </div>

        {/* Stats Overview */}
        {bookedTrainer.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FaUserTie className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{bookedTrainer.length}</div>
              <div className="text-xs text-gray-500">Total Sessions</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FaCrown className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ${bookedTrainer.reduce((sum, item) => sum + (item.Price || 0), 0)}
              </div>
              <div className="text-xs text-gray-500">Total Spent</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FaFire className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">Active</div>
              <div className="text-xs text-gray-500">Status</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FaStar className="text-white text-xl" />
              </div>
              <div className="text-2xl font-bold text-gray-800">Rate Us</div>
              <div className="text-xs text-gray-500">Share Feedback</div>
            </div>
          </div>
        )}

        {/* Bookings Grid */}
        {bookedTrainer.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookedTrainer.map((item, index) => (
              <div
                key={item._id || index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 overflow-hidden"
              >
                {/* Gradient Top Border */}
                <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>
                
                <div className="p-6">
                  {/* Trainer Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-60"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaUserTie className="text-white text-2xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                        {item.TrainerName}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs text-gray-500">Expert Trainer</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaDumbbell className="text-orange-500 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Package</p>
                        <p className="text-sm font-medium text-gray-700">{item.packageName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-orange-500 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Slot</p>
                        <p className="text-sm font-medium text-gray-700">{item.solt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaDollarSign className="text-orange-500 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-sm font-bold text-orange-600">${item.Price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Review Button */}
                  <button
                    onClick={() => openModal(item)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <FaComment className="text-sm" />
                    Write a Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-6">
              <FaCalendarAlt className="text-orange-500 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Bookings Found</h3>
            <p className="text-gray-400 mb-6">You haven't booked any training sessions yet</p>
            <a href="/trainers" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition">
              Browse Trainers
            </a>
          </div>
        )}
      </div>

      {/* Modern Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeInUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Share Your Experience</h2>
                  <p className="text-orange-100 text-sm mt-1">
                    {selectedBooking?.TrainerName} • {selectedBooking?.packageName}
                  </p>
                </div>
                <button onClick={closeModal} className="text-white hover:bg-white/20 rounded-full p-2 transition">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Rating Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <FaStar
                        className={`text-4xl transition-all ${
                          (hoveredStar || rating) >= star
                            ? "text-yellow-400 drop-shadow-lg"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent!"}
                </p>
              </div>

              {/* Feedback Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                  placeholder="Share your experience with this trainer..."
                  required
                ></textarea>
              </div>

              {/* User Info Preview */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
                <img
                  src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=FFA500&color=fff'}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{user?.displayName}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <FaCheckCircle className="text-green-500 text-lg" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Bookedpage;