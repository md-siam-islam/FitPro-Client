import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";

const Newslettersubscribers = () => {
  const AxiosPublic = useAxiosPublic();
  const [newsLatter, setNewsLatter] = useState([]);
  useEffect(() => {
    AxiosPublic.get("/newslate").then((res) => {
      setNewsLatter(res.data);
    });
  }, [AxiosPublic]);
  return (
    <div>
        <h1 className="text-2xl md:text-4xl my-6 underline
         text-center font-bold">All Newsletter subscribers</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Subscription Date
              </th>
            </tr>
          </thead>
          <tbody>
            {newsLatter?.length > 0 ? (
              newsLatter.map((subscriber, index) => (
                <tr key={subscriber._id} className="border-b border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subscriber.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subscriber.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(subscriber.subscriptionDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Newslettersubscribers;
