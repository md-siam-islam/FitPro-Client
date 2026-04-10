import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaUserAlt, FaChalkboardTeacher, FaBoxOpen, FaCalendarCheck, FaCreditCard } from "react-icons/fa";

const Payment = () => {
  const { name, solt, pkg } = useParams();
  const { user } = useContext(AuthContext);

  const packageDetails = JSON.parse(decodeURIComponent(pkg));
  const stripePromise = loadStripe(
    "pk_test_51QgggJIZSEhvBBrzr2crcuEXxwdweqBPABHAKhWhSQKA8k0DrmEXxtWtqyFx4Jfy0ceqp7y3ng3aqmoamssOe6UZ00ZASWh9CI"
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Secure <span className="text-[#FFA500]">Checkout</span>
        </h1>
        <p className="text-gray-500 font-medium italic">Complete your payment to finalize your booking with {name}</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Booking Summary Card */}
        <div className="lg:w-5/12 w-full">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full">
            <div className="bg-[#1a1a1a] p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaCalendarCheck className="text-[#FFA500]" /> Booking Summary
              </h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="bg-orange-50 p-3 rounded-full text-[#FFA500]">
                  <FaChalkboardTeacher size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Trainer</p>
                  <p className="text-lg font-bold text-gray-800">{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="bg-orange-50 p-3 rounded-full text-[#FFA500]">
                  <FaUserAlt size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">User Account</p>
                  <p className="text-gray-700 font-semibold">{user?.displayName}</p>
                  <p className="text-xs text-gray-400 italic">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="bg-orange-50 p-3 rounded-full text-[#FFA500]">
                  <FaBoxOpen size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Selected Package</p>
                  <p className="text-gray-800 font-bold">{packageDetails.name}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium italic">Selected Slot:</span>
                  <span className="text-gray-800 font-bold bg-white px-3 py-1 rounded-lg shadow-sm border">{solt}</span>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-800">Total Price</span>
                  <span className="text-3xl font-black text-[#FFA500]">${packageDetails.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="lg:w-7/12 w-full flex flex-col justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-transparent hover:border-[#FFA500] transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#FFA500] text-white p-3 rounded-xl shadow-lg shadow-orange-200">
                <FaCreditCard size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Card Information</h3>
                <p className="text-sm text-gray-400 font-medium italic">Your payment is encrypted and secure.</p>
              </div>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 mb-8">
              <p className="text-xs text-gray-500 text-center uppercase tracking-widest font-bold">Safe & Secure Payment via Stripe</p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckOutFrom 
                price={packageDetails.price} 
                pkgname={packageDetails.name} 
                solt={solt} 
                name={name}
              />
            </Elements>

            <div className="mt-8 flex justify-center items-center gap-6 grayscale opacity-50">
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" />
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;