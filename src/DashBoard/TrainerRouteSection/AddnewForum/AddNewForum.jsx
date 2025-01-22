import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useAdmin from "../../../Hook/UseAdmin/useAdmin";
import useTrainer from "../../../Hook/Usetrainer/useTrainer";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddNewForum = () => {
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();
  const badge = isAdmin ? "Admin" : isTrainer ? "Trainer" : "User";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Title: title,
      Description: description,
      Badge: badge,
      vote: 0,
    };

    AxiosPublic.post("/newforum", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Forum Add SUccessfull👍",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/forum')
        e.target.reset()
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>FitPro || Add New Forum</title>
      </Helmet>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Forum</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Forum Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter forum title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Forum Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Write a description for the forum..."
            ></textarea>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Posting as: <span className="font-bold">{badge}</span>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Forum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewForum;
