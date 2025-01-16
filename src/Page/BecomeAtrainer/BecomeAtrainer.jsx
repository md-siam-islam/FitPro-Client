import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BecomeAtrainer = () => {
    const imageKey = "6f830635465660e6fbef1d712018f776"
    const img_hosting_api_key = `https://api.imgbb.com/1/upload?key=${imageKey}`
    const AxiosPublic = useAxiosPublic()
    const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  
  const [selectedDays, setSelectedDays] = useState([]);
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
    const trainerData = {
      ...formData,
      availableDays: selectedDays.map((day) => day.value),
      status: "pending",
    };
  
    if (!formData.image || !formData.image[0]) {
      console.log("Image not found");
      return;
    }
  
    const imgFile = { image: formData.image[0] };
    const imgUploadResponse = await AxiosPublic.post(img_hosting_api_key, imgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    trainerData.profileImage = imgUploadResponse.data.data.display_url;
  
    if(imgUploadResponse.data.success){
      const ApplyTrainerInfo = {
        trainerid:user._id,
        image:imgUploadResponse.data.data.display_url,
        name:formData.name,
        email:user.email,
        Age:formData.age,
        skills: formData.skills,
        availableDays: formData.availableDays,
        availableTime: formData.availableTime,
        status: "pending"
      }

      AxiosPublic.post('/trainer',ApplyTrainerInfo)
      .then((res) => {
        reset()
        if(res.data.insertedId){
          navigate('/')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Trainer Request Successfull",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  };
  return (
    <div className="bg-white shadow-xl my-8 py-5 rounded">
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
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

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
          {errors.age && <p className="text-red-500 text-sm">Age is required</p>}

          {/* Profile Image */}
          {/* <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <input
            {...register("profileImage", { required: true })}
            type="text"
            placeholder="Enter Image URL"
            className="input input-bordered w-full"
          />
          {errors.profileImage && <p className="text-red-500 text-sm">Profile Image is required</p>} */}

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
          <input
            {...register("availableTime", { required: true })}
            type="text"
            placeholder="Enter Available Time (e.g., 9 AM - 5 PM)"
            className="input input-bordered w-full"
          />
          {errors.availableTime && (
            <p className="text-red-500 text-sm">Available time is required</p>
          )}

           <label className="label">
            <span className="label-text">Profile Image</span>
          </label>
          <div className="mb-6">
          <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
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
