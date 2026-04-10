import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, Dumbbell, Zap, Star, CheckCircle, ArrowRight } from "lucide-react";

const TrainerBookedPage = () => {
  const { trainername, solt, expertise } = useParams();

  const [day, time] = solt.split("-");
  const expertiseArray = expertise.split(",");
  const [selectPakage, setSelectPakage] = useState(null);

  const packages = [
    {
      name: "Basic Membership",
      benefits: [
        "Access to gym facilities during regular operating hours",
        "Use of cardio and strength training equipment",
      ],
      price: 10,
      popular: false,
      color: "from-blue-500 to-blue-600",
      badge: "",
    },
    {
      name: "Standard Membership",
      benefits: [
        "All benefits of the Basic Membership",
        "Access to group fitness classes such as yoga, spinning, and Zumba",
      ],
      price: 50,
      popular: true,
      color: "from-purple-500 to-indigo-600",
      badge: "Most Popular",
    },
    {
      name: "Premium Membership",
      benefits: [
        "All benefits of the Standard Membership",
        "Access to personal training sessions with certified trainers",
        "Discounts on additional services such as massage therapy",
      ],
      price: 100,
      popular: false,
      color: "from-amber-500 to-orange-600",
      badge: "Best Value",
    },
  ];

  const handleJoinNow = (pakage) => {
    setSelectPakage(pakage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitPro | {trainername} Booked page</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section with Trainer Info */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-6 h-6" />
              Your Training Session
            </h1>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {trainername?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{trainername}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {expertiseArray.map((exp, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {exp.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700 font-medium">{day}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700 font-medium">{time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Plans Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Choose Your <span className="text-orange-500">Membership Plan</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select the perfect plan that fits your fitness goals and start your journey with {trainername}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                selectPakage?.name === pkg.name ? "ring-4 ring-orange-400 ring-offset-2" : ""
              }`}
            >
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    pkg.popular ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white" : "bg-amber-500 text-white"
                  }`}>
                    {pkg.badge}
                  </span>
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${pkg.price}</span>
                  <span className="opacity-80">/month</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleJoinNow(pkg)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectPakage?.name === pkg.name
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectPakage?.name === pkg.name ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Selected
                    </>
                  ) : (
                    "Select Plan"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {selectPakage && (
          <div className="mt-12 text-center animate-fadeInUp">
            <Link
              to={`/payment/${trainername}/${solt}/${encodeURIComponent(JSON.stringify(selectPakage))}`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Continue to Payment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              You have selected the <span className="font-semibold text-orange-600">{selectPakage.name}</span>
            </p>
          </div>
        )}

        {/* No Selection Message */}
        {!selectPakage && (
          <div className="mt-12 text-center p-8 bg-white rounded-2xl shadow-md">
            <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Please select a membership plan above to continue with your booking</p>
          </div>
        )}
      </div>

      {/* Custom Animation Style */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TrainerBookedPage;