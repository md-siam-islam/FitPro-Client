import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Components/UseAxiosPublic/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const CheckOutFrom = ({price,pkgname,solt,name}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientsecret, setClientsecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const { user } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate()

console.log(price,solt,name,pkgname)
  useEffect(() => {
    AxiosPublic
      .post("/create-payment-intent", { price: price })
      .then((res) => {
        setClientsecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error fetching client secret:", err));
  }, [AxiosPublic]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //   confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "Unknown User",
            email: user?.email || "unknown@example.com",
          },
        },
      });
    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setError(confirmError.message);
    } else {
      // console.log("Payment successful:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setPaymentId(paymentIntent.id);
        const paymentInfo = {
          email: user.email,
          name: user.displayName,
          tansictionId: paymentIntent.id,
          Price:price,
          packageName:pkgname,
          solt:solt,
          TrainerName:name,
          status: "pending",
        };

        AxiosPublic.post("/payment", paymentInfo).then((res) => {
            console.log(res);
          if (res?.data?.insertedId) {
            navigate('/')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for your payment",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-10"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <p className="text-red-600 my-5">{error}</p>
        <p className="text-blue-600 my-5">{paymentId}</p>
      </form>
    </div>
  );
};

export default CheckOutFrom;
