import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Payment = () => {
  const { name, solt, pkg } = useParams();
  const {user} = useContext(AuthContext)
 
  const packageDetails = JSON.parse(decodeURIComponent(pkg));
  const stripePromise = loadStripe(
    "pk_test_51QgggJIZSEhvBBrzr2crcuEXxwdweqBPABHAKhWhSQKA8k0DrmEXxtWtqyFx4Jfy0ceqp7y3ng3aqmoamssOe6UZ00ZASWh9CI"
  );
  return (
    <div>
         <h1 className="text-3xl uppercase font-bold text-center my-10 underline">
          payment
        </h1>
    <div className="flex  justify-center gap-5 my-20 bg-white shadow-xl py-5 px-6 border-2 flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full bg-gray-300 px-7 py-5 flex flex-col  justify-center rounded-xl ">
       
        <h1 className="text-2xl font-bold">Trainer Name : {name}</h1>
        <h1>User Name : {user.displayName}</h1>
        <h1>User Email : {user.email}</h1>
        <h1>Solt Name : {solt}</h1>
        <h1>Package Name : {packageDetails.name}</h1>
        <h1>Package Price : $ {packageDetails.price}</h1>
      </div>
      <div className="lg:w-1/2 w-full">
        <Elements stripe={stripePromise}>
          <CheckOutFrom price={packageDetails.price} pkgname={packageDetails.name} solt={solt} name={name}></CheckOutFrom>
        </Elements>
      </div>
    </div>
    </div>
  );
};

export default Payment;
