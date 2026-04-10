import { Helmet } from "react-helmet";
import LoginLotti from "../assets/LottiFile/Login.json";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FaArrowLeft, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { userLogin, setUser, userGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        event.target.reset();
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome Back! Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorMessage = error.message || "Something went wrong. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
        });
      });
  };

  const googlelogin = () => {
    userGoogleLogin()
      .then((res) => {
        const user = res.user;
        setUser(user);
        if (user.email) {
          navigate("/");
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Sign-in successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <Helmet>
        <title>FitPro || Login</title>
      </Helmet>

      {/* Back to Home Button */}
      <div className="w-full max-w-6xl mb-6">
        <Link to={"/"} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-[#FFA500] hover:text-white transition-all shadow-sm">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Lottie Animation Side */}
        <div className="w-full lg:w-1/2 bg-orange-50/30 p-10 flex justify-center items-center">
          <div className="max-w-md w-full">
            <Lottie
              animationData={LoginLotti}
              loop={true}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Login Form Side */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Login to stay on track with FitPro</p>
          </div>

          <form onSubmit={handleUserLogin} className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-12 bg-gray-50 focus:border-[#FFA500] focus:ring-0 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-12 bg-gray-50 focus:border-[#FFA500] focus:ring-0 rounded-xl transition-all"
                  required
                />
              </div>
              {/* <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover text-[#FFA500]">Forgot password?</a>
              </label> */}
            </div>

            {/* Login Button */}
            <button className="btn w-full bg-[#FFA500] hover:bg-orange-600 text-white border-none py-3 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all transform active:scale-95">
              Login
            </button>

            <div className="divider text-gray-400 text-sm">OR CONTINUE WITH</div>

            {/* Social Login */}
            <button
              type="button"
              onClick={googlelogin}
              className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center gap-3 rounded-xl py-3"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Sign in with Google
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="font-medium text-gray-600">
              Don’t have an account?{" "}
              <Link to={"/signup"} className="text-[#FFA500] font-bold hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;