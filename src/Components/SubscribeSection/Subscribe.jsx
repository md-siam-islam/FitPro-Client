import React from "react";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";

const Subscribe = () => {
    const AxiosPublic = useAxiosPublic()

    const handleSubscription = (event) =>{
        event.preventDefault();
        
        const name = event.target.name.value
        const email = event.target.email.value 

        const data = {
            name,email
        }

        AxiosPublic.post('/newslate',data)
        .then((res) => {
            if(res.data.insertedId){
                Swal.fire({
                      title: "success",
                      text: "Your Submit Successfull",
                      icon: "success",
                    });
                event.target.reset()
            }
        })
    }
  return (
    <div>
      <div className="newsletter bg-gray-100 py-10 px-5 mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Subscribe to Our Newsletter
        </h2>
        <form onSubmit={handleSubscription} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            className="block w-full mb-4 px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            required
            className="block w-full mb-4 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="block w-full bg-[#FFA500] text-white py-2 rounded hover:bg-blue-600"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
