import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AppliedTrainer = () => {
  const AxiosPublic = useAxiosPublic();

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/trainer");
      return res.data.filter((trainer) => trainer.status === "pending"); // Filter by status
    },
  });
  return (
    <div>
      <Helmet>
        <title>Dashboard || Applied Trainer</title>
      </Helmet>
      <h1 className="text-2xl md:text-4xl font-bold border-y-2 text-center mb-5 py-3">
        All Applied Trainers Page
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, index) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={trainer.profileImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{trainer.name}</td>
                <td className="text-green-500">{trainer.status}</td>
                <th>
                  <Link to={`/appliedtrainerdetails/${trainer._id}`}><button
                    
                    className="bg-[#FFA500] text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Details
                  </button></Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
