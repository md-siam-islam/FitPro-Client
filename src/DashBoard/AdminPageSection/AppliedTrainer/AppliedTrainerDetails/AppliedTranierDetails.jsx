import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPublic from "../../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { 
  FaArrowLeft, FaCheckCircle, FaTimesCircle, FaUser, 
  FaEnvelope, FaCalendarAlt, FaDumbbell, FaClock, 
  FaInfoCircle, FaStar, FaAward, FaPhone, FaMapMarkerAlt,
  FaLinkedin, FaGithub, FaTwitter
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import useAxiosSecure from "../../../../Hook/UseAxiosSecure/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const AppliedTrainerDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [reject, setReject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: trainer = {}, refetch } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/allTrainer/${id}`);
      return res.data;
    },
  });

  const handleConfirm = async (id) => {
    setIsSubmitting(true);
    try {
      const res = await AxiosSecure.put(`/create-trainer/${id}`);
      if (res.data) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Trainer Approved!",
          text: `${res?.data?.trainer?.name} is now a certified trainer.`,
          confirmButtonColor: "#FFA500",
          background: "#ffffff",
          customClass: {
            popup: "rounded-2xl",
          },
        });
        navigate("/dashboard/alltrainer");
      }
    } catch (error) {
      console.error("Error approving trainer:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while approving the trainer.",
        confirmButtonColor: "#FFA500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedback = async (id) => {
    if (!reject.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please provide feedback before rejecting.",
        confirmButtonColor: "#FFA500",
      });
      return;
    }

    setIsSubmitting(true);
    const data = { reject, email: trainer.email, trainerName: trainer.name };

    try {
      const deleteRes = await AxiosPublic.put(`/trainer-delete/${id}`);
      if (deleteRes.data.matchedCount > 0) {
        const rejectRes = await AxiosPublic.post('/reject', data);
        if (rejectRes.data.insertedId) {
          document.getElementById("reject_modal").close();
          Swal.fire({
            icon: "success",
            title: "Trainer Rejected",
            text: `${trainer.name} has been rejected. Feedback has been sent.`,
            confirmButtonColor: "#FFA500",
            timer: 2000,
          });
          setTimeout(() => {
            navigate("/dashboard/appliedtrainer");
          }, 500);
        } else {
          throw new Error("Failed to insert rejection data");
        }
      } else {
        throw new Error("Trainer not found for deletion");
      }
    } catch (error) {
      console.error("Error rejecting trainer:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while rejecting the trainer.",
        confirmButtonColor: "#FFA500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to={"/dashboard/appliedtrainer"} className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-6 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Applications</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Application Review</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            Trainer <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Application</span>
          </h1>
          <p className="text-gray-500 mt-2">Review the candidate's qualifications and experience</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-orange-500 to-red-500">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-60"></div>
                <img
                  src={trainer.profileImage || "https://via.placeholder.com/150"}
                  alt={trainer.name}
                  className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                />
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${trainer.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}></div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{trainer.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${trainer.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {trainer.status === "pending" ? "Pending Review" : "Approved"}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email Address</p>
                    <p className="text-gray-700 font-medium">{trainer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="text-gray-700 font-medium">{trainer.age} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaAward className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="text-gray-700 font-medium">{trainer.experience} years</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaDumbbell className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Expertise</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(trainer.expertise || []).map((exp, i) => (
                        <span key={i} className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaClock className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Available Time</p>
                    <p className="text-gray-700 font-medium">{trainer.availableTime || "Flexible"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Slots */}
            {trainer.availableSlots && trainer.availableSlots.length > 0 && (
              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaClock className="text-orange-500" />
                  Available Slots
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trainer.availableSlots.map((slot, i) => (
                    <span key={i} className="px-3 py-1 bg-white rounded-lg text-sm text-gray-600 shadow-sm">
                      {slot.day}: {slot.time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bio/Details */}
            {trainer.details && (
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-orange-500" />
                  About the Trainer
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{trainer.details}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => handleConfirm(trainer?._id)}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <FaCheckCircle />
                {isSubmitting ? "Processing..." : "Approve Trainer"}
              </button>
              <button
                onClick={() => document.getElementById("reject_modal").showModal()}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <FaTimesCircle />
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <dialog id="reject_modal" className="modal">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeInUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaTimesCircle className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Reject Application</h2>
                  <p className="text-red-100 text-sm">Provide feedback for the applicant</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-4 p-4 bg-red-50 rounded-2xl">
                <p className="text-gray-700">
                  You are about to reject <span className="font-semibold text-gray-900">{trainer.name}</span>'s application.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Experience:</strong> {trainer.experience} years
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback / Reason for Rejection
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                  rows="5"
                  value={reject}
                  onChange={(e) => setReject(e.target.value)}
                  placeholder="Please provide constructive feedback to help the applicant improve..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => handleFeedback(trainer._id)}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Submit & Reject"}
              </button>
              <button
                onClick={() => document.getElementById("reject_modal").close()}
                className="px-6 py-3 bg-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
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

export default AppliedTrainerDetails;