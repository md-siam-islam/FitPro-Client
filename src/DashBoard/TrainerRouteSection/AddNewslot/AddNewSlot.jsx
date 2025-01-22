import React, { useContext, useEffect, useState } from "react";
import Select from "react-select"; // React Select
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AddNewSlot = () => {
  const { user } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const [trainer, setTrainer] = useState(null); // Trainer data state
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const expertise = selectedClasses.map((item) => item.value);
  "this is a skil", expertise;

  useEffect(() => {
    // Fetch trainer data based on user's email
    AxiosPublic.get(`/reject-trainer/${user?.email}`)
      .then((res) => setTrainer(res.data))
      .catch((err) => console.error(err));
  }, [AxiosPublic, user?.email]);

  useEffect(() => {
    AxiosPublic.get("/newclass")
      .then((res) => {
        // console.log("Fetched data:", res.data);
        if (Array.isArray(res.data)) {
          setClasses(res.data);
        } else {
          setClasses([res.data]);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [AxiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSlot = {
      slotName,
      slotTime,
      selectedDays,
      expertise,
    };
    AxiosPublic.post(`/updateSolt/${user?.email}`, newSlot).then((res) => {
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Slot Update",
          text: ` New Slot Add successfully`,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Something went wrong. Please try again.",
          confirmButtonText: "OK",
        });
      }
    });
  };

  if (!trainer) {
    return <p>Loading...</p>;
  }

  const dayOptions = trainer.map((data) =>
    data?.availableSlots.map((solt) => ({
      value: solt.day,
      label: solt.day,
    }))
  );

  const classNames =
    classes && classes[0]?.classes
      ? classes[0]?.classes.map((classItem) => classItem.className)
      : [];
  // console.log(classNames);

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow rounded">
      <h1 className="text-center font-bold underline text-3xl mb-5">
        Add New Slot
      </h1>

      {classes.map((data) => (
        <>
          <h1>{data.className}</h1>
        </>
      ))}

      <div className="mb-5">
        {trainer.map((trainer) => (
          <div>
            <img
              src={trainer.profileImage}
              alt={trainer.name}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
            <h2 className="text-center font-semibold text-xl">
              {trainer.name}
            </h2>
            <p className="text-center text-gray-500">{trainer.email}</p>
            <p className="text-center text-gray-500">Age: {trainer.age}</p>
            <p className="text-center text-gray-500">
              Experience: {trainer.experience} years
            </p>
          </div>
        ))}
      </div>

      {/* Add New Slot Form */}
      <form onSubmit={handleSubmit}>
        {/* Slot Name */}
        <div className="mb-4">
          <label className="block font-semibold">Slot Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="e.g., Morning Slot"
            value={slotName}
            onChange={(e) => setSlotName(e.target.value)}
          />
        </div>

        {/* Slot Time */}
        <div className="mb-4">
          <label className="block font-semibold">Slot Time</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="e.g., 1 hour"
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
          />
        </div>

        {/* Select Days */}
        <div className="mb-4">
          <label className="block font-semibold">Select Days</label>
          <Select
            options={dayOptions[0]}
            isMulti
            onChange={(selected) =>
              setSelectedDays(selected.map((day) => day.value))
            }
          />
        </div>

        {/* Select Classes */}
        <div className="mb-4">
          <label className="block font-semibold">Classes Include</label>
          {classNames.length > 0 ? (
            <Select
              options={classNames.map((className) => ({
                value: className,
                label: className,
              }))}
              isMulti
              onChange={(selectedClasses) =>
                setSelectedClasses(selectedClasses)
              }
            />
          ) : (
            <p className="text-center text-gray-500">Loading classes...</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit/Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSlot;
