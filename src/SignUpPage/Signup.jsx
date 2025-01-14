import { Helmet } from "react-helmet";
import lottiSignup from "../assets/LottiFile/signup.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Signup = () => {
    const navigate = useNavigate()
    const {signupUser,setUser,userInfo} = useContext(AuthContext)

    const handleSignupUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const tram = event.target.tram.checked;
        
        const userData = {
            name,email,password,photo
        }

        if(password.length<6){
            return  Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 6 characters long",
              });
        }

        if(!tram){
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "plase accept our condition."
              });
        }

        const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

      if(!passwordPattern.test(password)){
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password is not strong enough.",
          });
      }


        signupUser(email,password)
        .then((userCredential) => {
            const user = userCredential.user
            userInfo({ displayName: name, photoURL: photo })
            setUser(user)
            event.target.reset();
            navigate('/')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration successful! ",
                showConfirmButton: false,
                timer: 1500
              });

        })

        .catch((error) => {
            const errorMessage =
              error.message || "Something went wrong. Please try again.";
            return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: errorMessage,
            });
          });
    }
  return (
    <div className="w-11/12 mx-auto my-5">
        <Link to={'/'}><button className="btn bg-[#FFA500] text-white font-semibold"><FaArrowLeft></FaArrowLeft> Back to Home</button></Link> 
      <Helmet>
        <title>FitPro || Sign Up</title>
      </Helmet>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between p-8 mx-auto bg-white rounded-lg shadow-lg">
        
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Lottie 
            animationData={lottiSignup} 
            loop={true} 
            className="w-full h-full max-h-96 lg:max-h-full" 
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 space-y-6">
        <h1 className="font-semibold text-2xl text-center">
              Register your account
            </h1>
          <form onSubmit={handleSignupUser} className="w-full flex flex-col space-y-4">
          <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter Your Photo URL"
                  className="input input-bordered"
                />
              </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full p-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full p-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input
                    type="checkbox"
                    name="tram"
                    className="checkbox checkbox-accent"
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>

            <div className="form-control mt-6 w-full">
              <button className="btn bg-[#FFA500] w-full p-4 rounded-lg">Sign Up</button>
            </div>
            <div className="divider">OR</div>
              <div className="form-control mt-6 mb-4">
                <button  className="btn btn-neutral">
                  {" "}
                  <img
                    className="h-8"
                    src="https://img.icons8.com/?size=48&id=V5cGWnc9R4xj&format=png"
                    alt=""
                  />
                  Sign up With Google
                </button>
              </div>
            <div>
                <h1 className="font-semibold text-center">
                  Already Have An Account?{" "}
                  <Link to={"/login"} className="text-[#FFA500]">
                    Login
                  </Link>
                </h1>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
