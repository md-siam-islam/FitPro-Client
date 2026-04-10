import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaPlusCircle, FaImage, FaClock, FaAlignLeft, FaInfoCircle } from "react-icons/fa";

const AddnewClass = () => {
  const imageKey = "6f830635465660e6fbef1d712018f776";
  const img_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imageKey}`;
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    if (!formData.image || !formData.image[0]) return;

    const imgFile = new FormData();
    imgFile.append("image", formData.image[0]);

    try {
      // Show loading state
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while we create your class',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const imgUploadResponse = await AxiosPublic.post(img_hosting_api_key, imgFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgUploadResponse.data.success) {
        const classData = {
          classImage: imgUploadResponse.data.data.display_url,
          className: formData.className,
          Duration: formData.Duration,
          details: formData.details,
          additionalInfo: formData.additionalInfo,
        };

        await AxiosPublic.post("/newclass", classData);
        reset();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New Class Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/classes");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload image or save class", "error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <Helmet>
        <title>FitPro || Add New Class</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-[#1a1a1a] p-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-[#FFA500]/10 mb-4">
              <FaPlusCircle className="text-[#FFA500] text-4xl" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Create New <span className="text-[#FFA500]">Class</span>
            </h1>
            <p className="text-gray-400 mt-2 italic">Fill in the details to launch a new fitness session</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Class Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Morning Yoga"
                    {...register("className", { required: "Class name is required" })}
                    className={`w-full pl-4 py-3 rounded-xl border-2 transition-all outline-none ${
                      errors.className ? "border-red-400" : "border-gray-100 focus:border-[#FFA500]"
                    }`}
                  />
                </div>
                {errors.className && <span className="text-red-500 text-xs mt-1">{errors.className.message}</span>}
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700">Duration</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 45 Mins"
                    {...register("Duration", { required: "Duration is required" })}
                    className={`w-full pl-4 py-3 rounded-xl border-2 transition-all outline-none ${
                      errors.Duration ? "border-red-400" : "border-gray-100 focus:border-[#FFA500]"
                    }`}
                  />
                  <FaClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.Duration && <span className="text-red-500 text-xs mt-1">{errors.Duration.message}</span>}
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">Cover Image</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-2xl hover:border-[#FFA500] transition-colors bg-gray-50/50">
                <div className="space-y-1 text-center">
                  <FaImage className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-bold text-[#FFA500] hover:text-orange-600">
                      <span>Upload a file</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        {...register("image", { required: "Image is required" })} 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>}
            </div>

            {/* Details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">Class Details</span>
              </label>
              <textarea
                placeholder="What will members learn in this class?"
                rows="4"
                {...register("details", { required: "Details are required" })}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none resize-none ${
                  errors.details ? "border-red-400" : "border-gray-100 focus:border-[#FFA500]"
                }`}
              ></textarea>
              {errors.details && <span className="text-red-500 text-xs mt-1">{errors.details.message}</span>}
            </div>

            {/* Additional Info */}
            <div className="form-control">
              <label className="label flex gap-2">
                <span className="label-text font-bold text-gray-700">Requirement/Additional Info</span>
                <span className="badge badge-sm badge-ghost">Optional</span>
              </label>
              <textarea
                placeholder="Any special equipment needed?"
                rows="2"
                {...register("additionalInfo")}
                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#FFA500] outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-[#FFA500] text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-200 hover:bg-[#e69500] hover:-translate-y-1 transition-all transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                Create Class Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddnewClass;