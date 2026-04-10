import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useAdmin from "../../../Hook/UseAdmin/useAdmin";
import useTrainer from "../../../Hook/Usetrainer/useTrainer";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPenNib, FaFileAlt, FaUserShield, FaPlusCircle } from "react-icons/fa";

const AddNewForum = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();
  const badge = isAdmin ? "Admin" : isTrainer ? "Trainer" : "User";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Title: title,
      Description: description,
      Badge: badge,
      vote: 0,
    };

    AxiosPublic.post("/newforum", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Forum Post Created!",
          text: "Your topic has been shared with the community.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/forum");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <Helmet>
        <title>FitPro || Create Forum</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-[#1a1a1a] p-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-[#FFA500]/10 mb-4">
              <FaPlusCircle className="text-[#FFA500] text-4xl" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Start a <span className="text-[#FFA500]">Discussion</span>
            </h1>
            <p className="text-gray-400 mt-2 italic font-medium">
              Share your insights and tips with the FitPro community
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {/* Forum Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <FaPenNib className="text-[#FFA500]" />
                Forum Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#FFA500] outline-none transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder:text-gray-300 shadow-sm"
                placeholder="What's on your mind? (e.g. Best morning cardio tips)"
              />
            </div>

            {/* Forum Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <FaFileAlt className="text-[#FFA500]" />
                Detailed Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="6"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#FFA500] outline-none transition-all bg-gray-50 focus:bg-white text-gray-800 placeholder:text-gray-300 shadow-sm resize-none"
                placeholder="Explain your topic in detail..."
              ></textarea>
            </div>

            {/* Posting Badge Info */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <FaUserShield className="text-[#FFA500] text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest leading-none">Author Identity</p>
                  <p className="text-gray-700 font-bold">Posting as <span className="text-[#FFA500]">{badge}</span></p>
                </div>
              </div>
              <span className="hidden md:block text-[10px] text-orange-300 font-bold uppercase italic tracking-tighter">
                Verified Profile
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-5 bg-[#FFA500] text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 hover:bg-[#e69500] hover:-translate-y-1 transition-all transform active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Publish Forum Post
              </button>
              <p className="text-center text-gray-400 text-xs mt-4 italic font-medium">
                By publishing, you agree to our community guidelines and terms.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewForum;