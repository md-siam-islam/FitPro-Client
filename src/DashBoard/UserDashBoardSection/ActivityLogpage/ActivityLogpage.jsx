import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { FaEye } from "react-icons/fa";

const ActivityLogpage = () => {
  const { user } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const [rejectData, setRejectData] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (user?.email) {
      AxiosPublic.get(`/reject-trainer/${user.email}`)
        .then((res) => {
          const data = res.data || [];
          const filterData = data.filter(
            (item) => item.status === "pending" || item.status === "Rejected"
          );
          setRejectData(filterData);
        })
        .catch((error) => {
          console.error("Error fetching activity log:", error);
        });
    }
  }, [AxiosPublic, user?.email]);

  useEffect(() => {
    AxiosPublic.get(`/feedback/${user?.email}`).then((res) => {
      setFeedback(res.data);
    });
  }, [AxiosPublic, user?.email]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center my-7">
        Activity Log Page
      </h1>

      <div className="p-5 bg-gray-100 rounded-md shadow-md">
        {rejectData.length === 0 ? (
          <p className="text-center text-gray-600">
            No activity logs available.
          </p>
        ) : (
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectData.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.status === "Rejected" && (
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        className="text-blue-600 hover:underline"
                      >
                        <FaEye></FaEye>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rejection Feedback</h3>
          {feedback.map((data) => (
            <p className="py-4">
             {data.reject}
            </p>
          ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ActivityLogpage;
