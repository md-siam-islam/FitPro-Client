import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFA500] opacity-[0.03] rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-[40px] overflow-hidden shadow-2xl">
          
          {/* Left Side: Contact Info (Dark Theme) */}
          <div className="lg:w-2/5 bg-[#111111] p-10 md:p-16 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-[#FFA500] font-bold uppercase tracking-[4px] text-sm mb-4">Contact Us</h2>
              <h1 className="text-4xl font-black mb-8">Get In <span className="text-[#FFA500]">Touch</span></h1>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Have questions about our memberships or classes? Reach out to us and start your fitness journey today!
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-[#FFA500] group-hover:text-black transition-all duration-300">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Phone</p>
                    <p className="text-lg font-bold">+880 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-[#FFA500] group-hover:text-black transition-all duration-300">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Email</p>
                    <p className="text-lg font-bold">info@fitpro.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-[#FFA500] group-hover:text-black transition-all duration-300">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Location</p>
                    <p className="text-lg font-bold">Banani, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-12 flex gap-4">
              {[<FaFacebookF />, <FaTwitter />, <FaInstagram />].map((icon, index) => (
                <a key={index} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FFA500] hover:text-black transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form (Light Theme) */}
          <div className="lg:w-3/5 p-10 md:p-16 bg-white">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FFA500] focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FFA500] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FFA500] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Write your message here..." 
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#FFA500] focus:bg-white outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-[#FFA500] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:bg-black hover:shadow-none transition-all flex items-center justify-center gap-3 uppercase tracking-widest group"
              >
                Send Message
                <FaPaperPlane className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;