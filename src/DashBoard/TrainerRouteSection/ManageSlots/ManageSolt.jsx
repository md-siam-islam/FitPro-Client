import React, { useContext } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { MdDelete } from "react-icons/md";

const ManageSolt = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: trainerSlots = [] } = useQuery({
    queryKey: [user?.email, "trainerSlots"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/manage-slots/${user?.email}`);
      return res.data;
    },
  });
  return (
   
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Manage Slots for {trainerSlots.trainerName}</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Booked By</th>
                  <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {trainerSlots.slots?.map((slot, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2">{slot.day}</td>
                    <td className="border border-gray-300 px-4 py-2">{slot.time}</td>
                    <td className={`border border-gray-300 px-4 py-2 ${slot.status === 'booked' ? 'text-red-500' : 'text-green-500'}`}>
                      {slot.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {slot.bookedBy ? `${slot.bookedBy} (${slot.bookedEmail})` : 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{slot.tansictionId || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-500 "><MdDelete className="text-2xl" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};

export default ManageSolt;
