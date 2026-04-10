import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useImagebb, { useAxiosBB } from "../../Imagebb/useImagebb";
import { 
  FaUser, FaEnvelope, FaCalendarAlt, FaBriefcase, 
  FaDumbbell, FaClock, FaInfoCircle, FaUpload, 
  FaCheckCircle, FaArrowRight, FaFire, FaMedal,
  FaYoutube, FaInstagram, FaLinkedin, FaFacebook
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const BecomeAtrainer = () => {
  const imageKey = "6f830635465660e6fbef1d712018f776";
  const img_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imageKey}`;
  const AxiosPublic = useAxiosPublic();
  const useAxiosBB = useImagebb();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTime = `${time} ${ampm}`;
  
  const daysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const skillsOptions = [
    { value: "Yoga", label: "🧘 Yoga", icon: "🧘" },
    { value: "Pilates", label: "💪 Pilates", icon: "💪" },
    { value: "Zumba", label: "💃 Zumba", icon: "💃" },
    { value: "Cardio", label: "🏃 Cardio", icon: "🏃" },
    { value: "Strength Training", label: "🏋️ Strength Training", icon: "🏋️" },
    { value: "HIIT", label: "⚡ HIIT", icon: "⚡" },
    { value: "CrossFit", label: "🔥 CrossFit", icon: "🔥" },
    { value: "Meditation", label: "🧠 Meditation", icon: "🧠" },
  ];

  const onSubmit = async (formData) => {
    if (!formData.image || !formData.image[0]) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload a profile image",
        confirmButtonColor: "#FFA500",
      });
      return;
    }

    setIsSubmitting(true);
    const imgFile = new FormData();
    imgFile.append("image", formData.image[0]);

    try {
      const imgUploadResponse = await useAxiosBB.post(
        img_hosting_api_key,
        imgFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imgUploadResponse.data.success) {
        const trainerData = {
          profileImage: imgUploadResponse.data.data.display_url,
          name: formData.name,
          socialIcons: formData.socialIcons || ["LinkedIn", "Instagram"],
          email: user.email,
          age: parseInt(formData.age),
          experience: parseInt(formData.experience),
          expertise: selectedSkills,
          availableSlots: selectedDays.map((day) => ({
            day: day.value,
            time: availableTime,
          })),
          details: formData.details,
          status: "pending",
          appliedAt: new Date(),
        };

        await AxiosPublic.post("/trainer", trainerData);
        reset();
        setSelectedDays([]);
        setSelectedSkills([]);
        setTime("");
        setAmpm("");
        
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your trainer application has been sent for review",
          confirmButtonColor: "#FFA500",
          background: "#ffffff",
          customClass: {
            popup: "rounded-2xl",
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#FFA500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitPro || Become a Trainer</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Join Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Become a <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Trainer</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Share your expertise, inspire others, and transform lives through fitness
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <FaMedal className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Trainer Application</h2>
                <p className="text-orange-100 text-sm">Fill out the form below to get started</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaUser className="text-orange-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">Name is required</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    defaultValue={user?.email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("age", { required: true, min: 18 })}
                    type="number"
                    placeholder="Enter your age"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">Age is required (min 18)</p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience (Years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("experience", { required: true, min: 0 })}
                    type="number"
                    placeholder="Years of experience"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1">Experience is required</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaDumbbell className="text-orange-500" />
                Professional Skills
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Your Expertise <span className="text-red-500">*</span>
                </label>
                <Select
                  options={skillsOptions}
                  isMulti
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                  placeholder="Choose your specialties..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "12px",
                      borderColor: "#e5e7eb",
                      padding: "2px",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#FFA500",
                      },
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      backgroundColor: isSelected ? "#FFA500" : isFocused ? "#FFF3E0" : "white",
                      color: isSelected ? "white" : "#374151",
                      cursor: "pointer",
                    }),
                  }}
                />
              </div>
            </div>

            {/* Availability Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaClock className="text-orange-500" />
                Availability
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Days <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={daysOptions}
                    isMulti
                    value={selectedDays}
                    onChange={setSelectedDays}
                    placeholder="Select available days..."
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "12px",
                        borderColor: "#e5e7eb",
                        padding: "2px",
                      }),
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 9:00"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                    <select
                      value={ampm}
                      onChange={(e) => setAmpm(e.target.value)}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition bg-white"
                    >
                      <option value="" disabled>Select</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaInfoCircle className="text-orange-500" />
                Additional Information
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("details", { required: true })}
                  placeholder="Tell us about your training philosophy, certifications, and what makes you unique..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                ></textarea>
                {errors.details && (
                  <p className="text-red-500 text-xs mt-1">Details are required</p>
                )}
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                <FaUpload className="text-orange-500" />
                Profile Image
              </h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Photo <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-500 transition cursor-pointer">
                  <input
                    {...register("image")}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileImage"
                  />
                  <label htmlFor="profileImage" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <FaUpload className="text-orange-500 text-2xl" />
                      </div>
                      <p className="text-sm text-gray-500">Click to upload profile image</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Social Links (Optional) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 pb-2 border-b border-gray-200">
                Social Media (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaLinkedin className="text-blue-600 text-xl" />
                  <input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 transition"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <FaInstagram className="text-pink-500 text-xl" />
                  <input
                    type="text"
                    placeholder="Instagram Handle"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              By submitting this form, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeAtrainer;