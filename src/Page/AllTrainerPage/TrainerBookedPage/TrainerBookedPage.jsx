import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const TrainerBookedPage = () => {
  const { trainername, solt, expertise } = useParams();

  const [day, time] = solt.split("-");
  const expertiseArray = expertise.split(",");

  const packages = [
    {
      name: "Basic Membership",
      benefits: [
        "Access to gym facilities during regular operating hours",
        "Use of cardio and strength training equipment",
      ],
      price: 10,
    },
    {
      name: "Standard Membership",
      benefits: [
        "All benefits of the Basic Membership",
        "Access to group fitness classes such as yoga, spinning, and Zumba",
      ],
      price: 50,
    },
    {
      name: "Premium Membership",
      benefits: [
        "All benefits of the Standard Membership",
        "Access to personal training sessions with certified trainers",
        "Discounts on additional services such as massage therapy",
      ],
      price: 100,
    },
  ];

  return (
    <div className="my-10">
        <Helmet>
            <title>FitPro | {trainername} Booked page</title>
        </Helmet>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Trainer: {trainername}</h1>
        <p className="mb-4">
          <strong>Selected Slot:</strong> {day}, {time}
        </p>
        <p className="mb-4">
          <strong>Expertise:</strong> {expertiseArray.join(", ")}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-center underline">Choose a Membership Plan</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Plan</th>
                <th className="border border-gray-300 p-2">Benefits</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{pkg.name}</td>
                  <td className="border border-gray-300 p-2">
                    <ul className="list-disc text-left">
                      {pkg.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-2">$ {pkg.price}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="radio"
                      name="membership"
                      onClick={() => handleJoinNow(pkg.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn bg-[#FFA500] mt-6 text-white font-semibold">Join Now</button>
      </div>
    </div>
  );
};

export default TrainerBookedPage;
