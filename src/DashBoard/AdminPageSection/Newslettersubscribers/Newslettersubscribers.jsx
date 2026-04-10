import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { 
  FaUsers, FaEnvelope, FaCalendarAlt, FaUser, 
  FaNewspaper, FaChartLine, FaDownload, FaSearch,
  FaCheckCircle, FaClock
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Newslettersubscribers = () => {
  const AxiosPublic = useAxiosPublic();
  const [newsLatter, setNewsLatter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    AxiosPublic.get("/newslate").then((res) => {
      setNewsLatter(res.data);
    });
  }, [AxiosPublic]);

  // Filter subscribers based on search
  const filteredSubscribers = newsLatter.filter(subscriber => 
    subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Subscription Date"];
    const csvData = filteredSubscribers.map(sub => [
      sub.name,
      sub.email,
      new Date(sub.subscriptionDate).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Stats
  const totalSubscribers = newsLatter.length;
  const newThisMonth = newsLatter.filter(sub => {
    const subDate = new Date(sub.subscriptionDate);
    const now = new Date();
    return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitPro || Newsletter Subscribers</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Subscriber Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Newsletter <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Subscribers</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage and monitor your growing community of fitness enthusiasts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalSubscribers}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
            <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
              <FaCheckCircle />
              <span>Active Subscribers</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">New This Month</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{newThisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              +{Math.round((newThisMonth / totalSubscribers) * 100) || 0}% growth rate
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Avg. Open Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">68%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaNewspaper className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-3 text-xs text-green-600">Above industry average</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Export Data</p>
                <button 
                  onClick={exportToCSV}
                  className="mt-1 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <FaDownload className="text-sm" />
                  <span>Download CSV</span>
                </button>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FaDownload className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white"
            />
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm">#</th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-orange-400" />
                      Subscriber Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-orange-400" />
                      Email Address
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-orange-400" />
                      Subscription Date
                    </div>
                  </th>
                 </tr>
              </thead>
              <tbody>
                {paginatedSubscribers.length > 0 ? (
                  paginatedSubscribers.map((subscriber, index) => (
                    <tr 
                      key={subscriber._id} 
                      className="border-b border-gray-100 hover:bg-orange-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <FaUser className="text-white text-xs" />
                          </div>
                          <span className="font-medium text-gray-800">{subscriber.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-400 text-sm" />
                          <span className="text-gray-600">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaClock className="text-gray-400 text-sm" />
                          <span className="text-gray-600">
                            {new Date(subscriber.subscriptionDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaUsers className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium">No subscribers found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search or check back later</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex gap-1">
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
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-orange-50 border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <FaDownload />
            Export All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newslettersubscribers;