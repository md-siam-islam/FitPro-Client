import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const AxiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [trainers, setTrainers] = useState([]);

  const {
    data: paginatedClasses = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["paginatedClasses", searchQuery],
    queryFn: async ({ page = 1 }) => {
      const res = await AxiosPublic.get(`/newclass?page=${page}&limit=6&q=${searchQuery}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { classes = [], totalPages = 1, currentPage = 1 } = paginatedClasses;

  useEffect(() => {
    AxiosPublic.get('/trainer')
    .then((res) => {
        const filterTrainer = res.data.filter((trainer) => trainer.role === "trainer")
        setTrainers(filterTrainer)
    })
  },[])
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading Classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">Failed to load classes. Please try again.</p>
      </div>
    );
  }


//   const { data: trainers = [] } = useQuery({
//     queryKey: ["trainer"],
//     queryFn: async () => {
//       const res = await AxiosPublic.get("/trainer");
//       return res.data.filter((trainer) => trainer.role === "trainer");
//     },
//   });

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>FitPro || All Class Page</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">All Classes</h1>

      {/* Search Input */}
      <div className="mb-5 flex items-center">
        <input
          type="text"
          placeholder="Search by Class Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 lg:w-1/3 mx-auto"
        />
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classInfo) => (
          <div
            key={classInfo._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={classInfo.classImage}
              alt={classInfo.className}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{classInfo.className}</h2>
              <p className="text-gray-600 mt-2">{classInfo.details}</p>
              <p className="text-gray-500 text-sm mt-1">Duration: {classInfo.Duration}</p>
              <p className="text-gray-500 text-sm mt-1">Additional Info: {classInfo.additionalInfo}</p>
              <button
                onClick={() => document.getElementById("my_modal_1").showModal()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Trainers
              </button>
            </div>

            {/* Modal for Trainers */}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Trainers for {classInfo.className}</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {trainers
                    .filter((trainer) => trainer.expertise.includes(classInfo.className))
                    .slice(0, 5)
                    .map((trainer) => (
                      <div key={trainer._id} className="flex items-center space-x-4">
                        <Link to={`/trainerDetails/${trainer._id}`}>
                          <img
                            src={trainer.profileImage}
                            alt={trainer.name}
                            className="w-16 h-16 rounded-full object-cover hover:scale-110 transition-transform duration-200"
                          />
                        </Link>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800">{trainer.name}</h4>
                          <p className="text-sm text-gray-500">Expertise: {trainer.expertise.join(", ")}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => refetch({ page: page + 1 })}
            className={`px-4 py-2 rounded ${
              currentPage === page + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
