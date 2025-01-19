import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useImagebb, { useAxiosBB } from "../../Imagebb/useImagebb";

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

    const handleAmpmChange = (e) => {
      setAmpm(e.target.value);
    };
  
    const handleTimeChange = (e) => {
      setTime(e.target.value);
    };
  

  const [selectedDays, setSelectedDays] = useState([]);
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

  const onSubmit = async (formData) => {
    if (!formData.image || !formData.image[0]) {
      console.log("Image not found");
      return;
    }

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
          age: formData.age,
          experience: formData.experience,
          expertise: formData.skills,
          availableSlots: selectedDays.map((day) => ({
            day: day.value,
            time: availableTime,
          })),
          // availableTime: formData.availableTime,
          details: formData.details,
          status: "pending",
        };

        await AxiosPublic.post("/trainer", trainerData);
        reset();
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Trainer Request Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="bg-white shadow-xl my-8 py-5 rounded">
      <Helmet>
        <title>All Trainer || Be a Trainer</title>
      </Helmet>
      <h1 className="text-center font-semibold underline">Be A Trainer Form</h1>
      <div className="w-9/12 mx-auto flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter Your Full Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          {/* Email */}
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: true })}
            type="text"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Age */}
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            {...register("age", { required: true })}
            type="number"
            placeholder="Enter Your Age"
            className="input input-bordered w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">Age is required</p>
          )}

          {/* experience */}
          <label className="label">
            <span className="label-text">Experience</span>
          </label>
          <input
            {...register("experience", { required: true })}
            type="number"
            placeholder="Enter Your Experience"
            className="input input-bordered w-full"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">experience is required</p>
          )}

          {/* Skills */}
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("skills")} value="Yoga" />
              Yoga
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("skills")} value="Pilates" />
              Pilates
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("skills")} value="Zumba" />
              Zumba
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("skills")} value="Cardio" />
              Cardio
            </label>
          </div>

          {/* Available Days */}
          <label className="label">
            <span className="label-text">Available Days</span>
          </label>
          <Select
            options={daysOptions}
            isMulti
            onChange={(selectedOptions) => setSelectedDays(selectedOptions)}
            placeholder="Select Available Days"
          />

          {/* Available Time */}
          <label className="label">
            <span className="label-text">Available Time</span>
          </label>

          <div className="flex gap-4">
          {/* Time Input */}
          <input
            type="text"
            value={time}
            onChange={handleTimeChange}
            placeholder="Enter Time (e.g., 9:00)"
            className="input input-bordered w-full"
          />

          {/* AM/PM Selector */}
          <select
            value={ampm}
            onChange={handleAmpmChange}
            className="select select-bordered w-28"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
          {errors.availableTime && (
            <p className="text-red-500 text-sm">Available time is required</p>
          )}
          <label className="label">
            <span className="label-text">Details</span>
          </label>
          <input
            {...register("details", { required: true })}
            type="text"
            placeholder="Enter Details"
            className="input input-bordered w-full"
          />

          <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <div className="mb-6">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* Apply Button */}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeAtrainer;
