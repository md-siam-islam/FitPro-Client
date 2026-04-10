import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { 
  FaEye, FaUser, FaEnvelope, FaClock, FaInfoCircle, 
  FaTimesCircle, FaHourglassHalf, FaCalendarAlt, 
  FaHistory, FaBell, FaCheckCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const ActivityLogpage = () => {
  const { user } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const [rejectData, setRejectData] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (user?.email) {
      AxiosPublic.get(`/reject-trainer/${user.email}`)
        .then((res) => {
          const data = res.data || [];
          const filterData = data.filter(
            (item) => item.status === "pending" || item.status === "Rejected"
          );
          setRejectData(filterData);
        })
        .catch((error) => {
          console.error("Error fetching activity log:", error);
        });
    }
  }, [AxiosPublic, user?.email]);

  useEffect(() => {
    AxiosPublic.get(`/feedback/${user?.email}`).then((res) => {
      setFeedback(res.data);
    });
  }, [AxiosPublic, user?.email]);

  const openModal = (item) => {
    setSelectedItem(item);
    document.getElementById("feedback_modal").showModal();
  };

  const getStatusBadge = (status) => {
    if (status === "pending") {
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: <FaHourglassHalf className="text-amber-500" />,
        label: "Pending Review"
      };
    }
    return {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <FaTimesCircle className="text-red-500" />,
      label: "Rejected"
    };
  };

  const pendingCount = rejectData.filter(item => item.status === "pending").length;
  const rejectedCount = rejectData.filter(item => item.status === "Rejected").length;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Track Your Progress</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Activity <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Log</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Monitor your trainer application status and review feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Applications</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{rejectData.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <FaHistory className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaHourglassHalf className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{rejectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FaTimesCircle className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        {rejectData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-6">
              <FaBell className="text-orange-500 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Activity Logs</h3>
            <p className="text-gray-400">You haven't submitted any trainer applications yet</p>
            <a href="/apply-trainer" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition mt-6">
              Apply as Trainer
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">#</th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-orange-400" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-orange-400" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-orange-400" />
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-white font-semibold text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <FaEye className="text-orange-400" />
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rejectData.map((item, index) => {
                    const status = getStatusBadge(item.status);
                    return (
                      <tr 
                        key={item.id || index} 
                        className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-xs" />
                            </div>
                            <span className="font-medium text-gray-800">{item.name || "N/A"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.email || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.status === "Rejected" && (
                            <button
                              onClick={() => openModal(item)}
                              className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300"
                            >
                              <FaEye className="text-sm group-hover:scale-110 transition-transform" />
                              <span className="text-sm font-medium">View Feedback</span>
                            </button>
                          )}
                          {item.status === "pending" && (
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-sm font-medium">
                              <FaHourglassHalf />
                              Awaiting Review
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modern Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeInUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaInfoCircle className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Application Feedback</h2>
                  <p className="text-orange-100 text-sm">Review the rejection reason</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {feedback.length > 0 ? (
                <div className="space-y-4">
                  {feedback.map((data, idx) => (
                    <div key={idx} className="bg-orange-50 rounded-2xl p-5 border-l-4 border-red-500">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaTimesCircle className="text-red-500 text-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-600 mb-1">Rejection Reason</p>
                          <p className="text-gray-700 leading-relaxed">{data.reject}</p>
                          {data.createdAt && (
                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                              <FaCalendarAlt />
                              <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaInfoCircle className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-500">No feedback available at this moment</p>
                </div>
              )}

              {/* Improvement Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Tips for Improvement
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Update your profile with complete information</li>
                  <li>Gain relevant certifications in your expertise area</li>
                  <li>Build a portfolio showcasing your experience</li>
                  <li>Re-apply after addressing the feedback points</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
              <button
                onClick={() => document.getElementById("feedback_modal").close()}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Got it, Thanks!
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

export default ActivityLogpage;