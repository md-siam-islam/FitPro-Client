import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import Admin from '../../assets/image/Admi Badge.jpg'
import Trainer from "../../assets/image/Trainer.png";

const Forum = () => {
  const AxiosPublic = useAxiosPublic();
  const [forum, setForum] = useState([]);

  useEffect(() => {
    AxiosPublic.get("/newpost").then((res) => {
      setForum(res.data);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen my-11">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Forum Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forum.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between h-full"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Title: <span className="font-normal text-gray-500">{item.Title}</span>
            </h2>
            <p className="text-gray-700 mb-4">{item.Description}</p>
            <div className="flex justify-between items-center">
              {/* Badge */}
              <div className="flex items-center gap-2">
                {item.Badge === "Admin" ? (
                  <img src={Admin} alt="Admin Badge" className="w-8 h-8" />
                ) : (
                  <img src={Trainer} alt="Trainer Badge" className="w-8 h-8" />
                )}
                <span className="text-gray-600 text-sm">{item.Badge}</span>
              </div>
              {/* Vote Section */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm">Total Vote:</span>
                <span className="text-blue-500 font-bold">{item.vote}</span>
                <button className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition">
                  <img
                    src="https://img.icons8.com/?size=32&id=Qh9flBZT3ETq&format=png"
                    alt="Vote Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
