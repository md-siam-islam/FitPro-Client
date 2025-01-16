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
    const handleConfirm = async () => {
        try {
            const res = await AxiosPublic.patch(`/trainer/confirm/${id}`, { status: "approved" });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Trainer confirmed successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch(); // Update the trainer data
                navigate("/admin/applied-trainers"); // Redirect to applied trainers page
            }
        } catch (error) {
            console.error("Error confirming trainer:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to confirm trainer!",
                text: error.message,
            });
        }
    };

    // Handle reject button click
    const handleReject = async () => {
        try {
            const res = await AxiosPublic.delete(`/trainer/reject/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Trainer rejected successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/admin/applied-trainers"); // Redirect to applied trainers page
            }
        } catch (error) {
            console.error("Error rejecting trainer:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to reject trainer!",
                text: error.message,
            });
        }
    };

    return (
        <div className="w-10/12 mx-auto mt-10">
            <Link to={'/dashboard/appliedtrainer'} className="btn bg-[#FFA500] mb-4"><FaArrowLeft></FaArrowLeft>Back to Trainer Applied Page</Link>
            <h1 className="text-center font-bold border-y-2 py-3 text-3xl">
                {trainer.name} Details Page
            </h1>
            <div className="mt-6 p-4 shadow-lg bg-white rounded">
                <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-48 h-48 object-cover mx-auto rounded-full"
                />
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">Name: {trainer.name}</h2>
                    <p>Email: {trainer.email}</p>
                    <p>Age: {trainer.Age}</p>
                    <p>Skills: {trainer.skills?.join(", ")}</p>
                    <p>Available Time: {trainer.availableTime}am</p>
                    <p>Status: <span className={`font-bold ${trainer.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>{trainer.status}</span></p>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleConfirm}
                        className="btn btn-success"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={handleReject}
                        className="btn btn-error"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppliedTrainerDetails;
