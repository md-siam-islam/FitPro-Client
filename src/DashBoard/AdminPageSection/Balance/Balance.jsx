import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { PieChart, Pie, Cell,Legend  } from "recharts";

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
  // console.log(items);

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const pichartData = [
    { name: "Paid Member", value: items.paidmember || 0 },
    { name: "Newsletter User", value: items.newslatteruser || 0 },
  ];
  
  const COLORS = ['#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  

  const totalPrice = payment.reduce((total, item) => total + item.Price, 0);

  const recentTransactions = Array.isArray(payment)
    ? payment.slice(-6).reverse()
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-7 text-center">
        Balance Page
      </h1>
      
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

        <div className="w-full md:w-10/12 mx-auto">
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
        <div className="flex items-center justify-center">
      <PieChart width={400} height={400}>
          <Pie
            data={pichartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pichartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
      </div>
    </div>
  );
};

export default Balance;
