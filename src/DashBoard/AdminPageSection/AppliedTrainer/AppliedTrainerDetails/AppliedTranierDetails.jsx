import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPublic from "../../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const AppliedTrainerDetails = () => {
  const { id } = useParams(); // Get Trainer ID from URL params
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch trainer details by ID
  const { data: trainer = {}, refetch } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/trainer/${id}`);
      return res.data;
    },
  });

  // Handle confirm button click
  const handleConfirm = async (id) => {
    try {
      const res = await AxiosPublic.put(`/create-trainer/${id}`);
      if (res.data) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Trainer Approved!",
          text: `${res.data.trainer.name} is now a trainer.`,
          confirmButtonText: "OK",
        });

        navigate("/dashboard/alltrainer");
      }
    } catch (error) {
      console.error("Error approving trainer:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while approving the trainer.",
        confirmButtonText: "OK",
      });
    }
  };

  const hadleFedback = (id, trainerName) => {
    AxiosPublic.delete(`/trainer-delete/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Trainer Rejected",
            text: `${trainerName} has been successfully rejected.`,
            confirmButtonText: "OK",
          }).then(() => {
            document.getElementById("my_modal_5").close();
            navigate('/dashboard/appliedtrainer');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Action Failed",
            text: "Unable to reject the trainer. Please try again.",
            confirmButtonText: "Retry",
          });
        }
      })
      .catch((error) => {
        console.error("Error rejecting trainer:", error);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Something went wrong. Please check your connection and try again.",
          confirmButtonText: "OK",
        });
      });
  };
  

  // Handle reject button click
  const handleReject = async () => {};

  return (
    <div className="w-10/12 mx-auto mt-10">
      <Link to={"/dashboard/appliedtrainer"} className="btn bg-[#FFA500] mb-4">
        <FaArrowLeft></FaArrowLeft>Back to Trainer Applied Page
      </Link>
      <h1 className="text-center font-bold border-y-2 py-3 text-3xl">
        {trainer.name} Details Page
      </h1>
      <div className="mt-6 p-4 shadow-lg bg-white rounded">
        <img
          src={trainer.profileImage}
          alt={trainer.name}
          className="w-48 h-48 object-cover mx-auto rounded-full"
        />
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">Name: {trainer.name}</h2>
          <p>Email: {trainer.email}</p>
          <p>Age: {trainer.Age}</p>
          <p>Expertise: {trainer.expertise?.join(", ")}</p>
          <p>Available Time: {trainer.availableTime}am</p>
          <p>
            Status:{" "}
            <span
              className={`font-bold ${
                trainer.status === "pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {trainer.status}
            </span>
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleConfirm(trainer._id)}
            className="btn btn-success"
          >
            Confirm
          </button>
          <button  onClick={() => document.getElementById("my_modal_5").showModal()} className="btn btn-error">
            Reject
          </button>
        </div>
      </div>

      {/* modal section start  */}
 <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-red-600 mb-4">Reject Trainer</h3>
    <p className="text-gray-700">
      Are you sure you want to reject{" "}
      <span className="font-semibold text-gray-900">{trainer.name}</span>?
    </p>
    <p className="mt-2 text-gray-600">
      <strong>Experience:</strong> {trainer.experience} years
    </p>

    <div className="mt-4">
      <label htmlFor="feedback" className="block font-medium text-gray-800">
        Feedback
      </label>
      <textarea
        id="feedback"
        className="textarea textarea-bordered w-full mt-2"
        rows="4"
        placeholder="Provide feedback here..."
        required
      ></textarea>
    </div>

    <div className="modal-action flex justify-between mt-6">
      {/* Submit Button */}
      <button
      onClick={() =>hadleFedback(trainer._id,trainer.name)}
        className="btn btn-error text-white w-40"
      >
        Submit Feedback
      </button>

      {/* Close Button */}
      <form method="dialog">
        <button className="btn btn-outline w-40">Close</button>
      </form>
    </div>
  </div>
</dialog>

      {/* modal section end */}

    </div>
  );
};

export default AppliedTrainerDetails;
