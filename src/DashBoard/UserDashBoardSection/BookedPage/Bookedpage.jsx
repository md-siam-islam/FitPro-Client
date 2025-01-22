import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const Bookedpage = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const [bookedTrainer, setBookedTrainer] = useState([]);
  // console.log(bookedTrainer);

  useEffect(() => {
    if (user?.email) {
      AxiosPublic.get(`/payment/${user?.email}`)
        .then((res) => {
          setBookedTrainer(res.data);
        })
        .catch((error) => console.error(error));
    }
  }, [AxiosPublic, user?.email]);

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = { feedback, rating,Name:user.displayName ,email:user.email,photo:user.photoURL };

    AxiosPublic.post("/review", reviewData).then((res) => {
      if (res.data.insertedId) {
        document.getElementById("my_modal_2").close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for your review",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    // console.log("Review Submitted: ", reviewData);
   
  };
  const handleclose = () => {
    document.getElementById("my_modal_2").close();
  };
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Booked Trainers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTrainer.length > 0 ? (
          bookedTrainer.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Trainer Name:</strong> {item.TrainerName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Package Name:</strong> {item.packageName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Slot:</strong> {item.solt}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Package Price:</strong> ${item.Price}
              </p>

              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="mt-4 w-full bg-[#FFA500] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Review
              </button>

              {/* this is a modal section  */}

              <dialog id="my_modal_2" className="modal">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-xl font-bold mb-4">
                      Submit Your Review
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Your Feedback
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows="4"
                          className="w-full border rounded p-2"
                          required
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Your Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRating(star)}
                              className={`p-1 ${
                                rating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="bg-[#FFA500] text-white py-2 px-4 rounded"
                        >
                          Submit
                        </button>

                        <button
                          onClick={handleclose}
                          className="bg-[#FFA500] text-white py-2 px-4 rounded"
                        >
                          close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>

              {/* this is a modal section  */}
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-600">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookedpage;
