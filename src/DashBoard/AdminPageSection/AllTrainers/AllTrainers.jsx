import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AllTrainers = () => {
  const AxiosPublic = useAxiosPublic();
  const {user} = useContext(AuthContext)

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/trainer");
      return res.data.filter((trainer) => trainer.role === "trainer"); // Filter by role
    },
  });

  const handleDeleteTrainer = (id) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosPublic.delete(`/delete-trainer/${id}`)
        .then((res) => {
          // console.log(res?.data)
          if(res?.data?.TrainDelete?.deletedCount>0){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
          }else {
            Swal.fire({
              title: "Failed!",
              text: "Could not delete the trainer.",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting trainer:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
          });
        });
        
      }
    });
  }
  return (
    <div>
        <Helmet>
            <title>Dashboard || All Trainer</title>
        </Helmet>
        <h1 className="text-2xl md:text-4xl font-bold border-y-2 text-center mb-5">All Trainers Page</h1>
      <div className="overflow-x-auto w-full lg:w-10/12 mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>role</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer,index) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={trainer.profileImage ? trainer.profileImage : trainer.image }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {trainer.name}
                </td>
                <td>{trainer.role}</td>
                <td>{trainer.experience} Year</td>
                <th>
                  <button
                    onClick={() =>handleDeleteTrainer(trainer._id)}
                    className="bg-[#FFA500] text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete Trainer
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainers;
