import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddnewClass = () => {
  const imageKey = "6f830635465660e6fbef1d712018f776";
  const img_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imageKey}`;
  const AxiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    if (!formData.image || !formData.image[0]) {
      console.log("Image not found");
      return;
    }

    const imgFile = new FormData();
    imgFile.append("image", formData.image[0]);

    try {
      const imgUploadResponse = await AxiosPublic.post(
        img_hosting_api_key,
        imgFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imgUploadResponse.data.success) {
        const classData = {
          classImage: imgUploadResponse.data.data.display_url,
          className: formData.className,
          Duration: formData.Duration,
          details: formData.details,
          additionalInfo: formData.additionalInfo
        };

        await AxiosPublic.post("/newclass", classData);
        reset();
        navigate("/classes");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Class Add Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    console.log(formData);
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Class Name */}
        <div>
          <label htmlFor="className" className="block font-semibold mb-1">
            Class Name
          </label>
          <input
            type="text"
            id="className"
            {...register("className", { required: "Class name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">
              {errors.className.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="className" className="block font-semibold mb-1">
            Duration
          </label>
          <input
            type="text"
            id="className"
            {...register("Duration", {
              required: "Class Duration is required",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">
              {"Class Duration is required"}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block font-semibold mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image", { required: "Image URL is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" className="block font-semibold mb-1">
            Details
          </label>
          <textarea
            id="details"
            {...register("details", { required: "Details are required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">
              {errors.details.message}
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additionalInfo" className="block font-semibold mb-1">
            Additional Info (Optional)
          </label>
          <textarea
            id="additionalInfo"
            {...register("additionalInfo")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddnewClass;
