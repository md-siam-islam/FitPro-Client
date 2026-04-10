import React from "react";
import useAxiosPublic from "../../../Components/UseAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { FaWallet, FaExchangeAlt, FaChartPie } from "react-icons/fa";

const Balance = () => {
  const AxiosPublic = useAxiosPublic();

  const { data: payment = [], isLoading: paymentLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/payment");
      return res.data;
    },
  });

  const { data: items = {}, isLoading: chartLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/chart");
      return res.data;
    },
  });

  const pichartData = [
    { name: "Paid Member", value: items.paidmember || 0 },
    { name: "Newsletter User", value: items.newslatteruser || 0 },
  ];

  const COLORS = ["#FFA500", "#1a1a1a"];

  const totalPrice = payment.reduce((total, item) => total + item.Price, 0);
  const recentTransactions = Array.isArray(payment) ? payment.slice(-6).reverse() : [];

  if (paymentLoading || chartLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-[#FFA500]"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>FitPro || Balance Overview</title>
      </Helmet>

      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">
          Financial <span className="text-[#FFA500]">Dashboard</span>
        </h1>
        <p className="text-gray-500 mt-2 italic font-medium">Real-time revenue and user distribution analytics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-orange-100 p-4 rounded-2xl text-[#FFA500]">
            <FaWallet size={30} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
            <h2 className="text-3xl font-black text-gray-800">${totalPrice.toLocaleString()}</h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
            <FaExchangeAlt size={30} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Transactions</p>
            <h2 className="text-3xl font-black text-gray-800">{payment.length}</h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
            <FaChartPie size={30} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Paid Growth</p>
            <h2 className="text-3xl font-black text-gray-800">{items.paidmember || 0}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
            <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full border">Last 6 Activities</span>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="table w-full">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider border-none">
                  <th className="bg-white">Customer</th>
                  <th className="bg-white">Amount</th>
                  <th className="bg-white">Package</th>
                  <th className="bg-white">Trainer</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                    <td className="py-4">
                      <div>
                        <p className="font-bold text-gray-800">{transaction.name || "Unknown"}</p>
                        <p className="text-[10px] text-gray-400 font-mono tracking-tighter">{transaction.tansictionId}</p>
                      </div>
                    </td>
                    <td className="font-bold text-green-600">${transaction.Price}</td>
                    <td><span className="bg-orange-50 text-[#FFA500] px-3 py-1 rounded-lg font-bold text-xs">{transaction.packageName}</span></td>
                    <td className="text-gray-500 font-medium">{transaction.TrainerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Distribution Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-6 self-start">User Distribution</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pichartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pichartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 w-full space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium italic">Paid Subscription</span>
                <span className="font-bold text-gray-800">{items.paidmember}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium italic">Newsletter Users</span>
                <span className="font-bold text-gray-800">{items.newslatteruser}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;