import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";
import { Helmet } from "react-helmet";

const Balance = () => {
  const AxiosPublic = useAxiosPublic();
  const { data: payment = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/payment");
      return res.data;
    },
  });

  const { data: items = [] } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/chart");
      return res.data;
    },
  });
  console.log(items);

  const totalPrice = payment.reduce((total, item) => total + item.Price, 0);

  const recentTransactions = Array.isArray(payment)
    ? payment.slice(-6).reverse()
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-7 text-center">
        Balance Page
      </h1>
   <div className="">
   <PieChart width={400} height={400}>
          <Pie
            data={items.paidmember}
            dataKey="value"
            nameKey="paidmember"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={items.newslatteruser}
            dataKey="value"
            nameKey="newslatteruser"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#FFA500"
          />
    </PieChart>
   </div>
      <div className="p-5 bg-gray-100 rounded-md shadow-md">
        <Helmet>
          <title>FitPro || Blance</title>
        </Helmet>
        <h1 className="text-3xl font-bold underline mb-7 text-center">
          Financial Overview
        </h1>

        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Total Balance:</h2>
          <p className="text-lg font-medium text-green-600">${totalPrice}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Last 6 Transactions:</h2>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Transaction ID
                </th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">
                  Package Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Slot</th>
                <th className="border border-gray-300 px-4 py-2">
                  Trainer Name
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, index) => (
                <tr key={transaction.tansictionId || index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.tansictionId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${transaction.Price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.packageName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.solt}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.TrainerName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Balance;
