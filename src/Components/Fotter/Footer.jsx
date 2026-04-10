import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & About */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-extrabold tracking-tighter italic">
            <span className="text-[#FFA500]">Fit</span>PRO
          </Link>
          <p className="text-gray-400 leading-relaxed">
            Your ultimate destination for fitness excellence. We provide world-class trainers and a community that keeps you motivated to reach your peak potential.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#FFA500] transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-[#FFA500] transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-[#FFA500] transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-[#FFA500] transition-colors"><FaYoutube /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link to="/" className="hover:text-[#FFA500] transition-all hover:pl-2">Home</Link></li>
            <li><Link to="/trainer" className="hover:text-[#FFA500] transition-all hover:pl-2">All Trainers</Link></li>
            <li><Link to="/classes" className="hover:text-[#FFA500] transition-all hover:pl-2">Our Classes</Link></li>
            <li><Link to="/forum" className="hover:text-[#FFA500] transition-all hover:pl-2">Community & Forum</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#FFA500] mt-1" />
              <span>123 Fitness Plaza, Health Avenue<br />Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FFA500]" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#FFA500]" />
              <span>support@fitpro.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">Subscribe to get latest fitness tips and offers.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="input input-bordered w-full bg-[#2a2a2a] border-gray-700 focus:border-[#FFA500]" 
            />
            <button className="btn bg-[#FFA500] hover:bg-orange-600 border-none text-white w-full">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <span className="text-[#FFA500] font-semibold">FitPRO</span>. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;