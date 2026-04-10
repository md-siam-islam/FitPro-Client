import { Helmet } from "react-helmet";
import lottiSignup from "../assets/LottiFile/signup.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaLink, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../Components/UseAxiosPublic/useAxiosPublic";

const Signup = () => {
  const navigate = useNavigate();
  const { signupUser, setUser, userInfo, userGoogleLogin } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();

  const handleSignupUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value.toLowerCase();
    const password = form.password.value;
    const tram = form.tram.checked;

    // Validation Logic
    if (password.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long",
      });
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Include uppercase, lowercase, number, and special character.",
      });
    }

    if (!tram) {
      return Swal.fire({
        icon: "info",
        title: "Terms & Conditions",
        text: "Please accept our terms to continue.",
      });
    }

    signupUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        userInfo({ displayName: name, photoURL: photo })
          .then(() => {
            const userData = {
              name: name,
              email: email,
              photo: photo,
              role: "member",
            };
            AxiosPublic.post("/user", userData).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Account Created Successfully!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                form.reset();
                navigate("/");
              }
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const googlelogin = () => {
    userGoogleLogin().then((res) => {
      const user = res.user;
      setUser(user);
      const googleUserInfo = {
        name: user.displayName,
        email: user.email,
        role: "member",
      };
      AxiosPublic.post("/user", googleUserInfo).then(() => {
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "Welcome to FitPro via Google!",
          timer: 1500,
          showConfirmButton: false
        });
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <Helmet>
        <title>FitPro || Sign Up</title>
      </Helmet>

      {/* Navigation Button */}
      <div className="w-full max-w-6xl mb-6">
        <Link to={"/"} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-[#FFA500] hover:text-white transition-all shadow-sm">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row-reverse items-center justify-between bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 bg-orange-50/30 p-10 flex justify-center items-center">
          <div className="max-w-md w-full">
            <Lottie animationData={lottiSignup} loop={true} className="w-full h-auto" />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2">Join FitPro to start your transformation</p>
          </div>

          <form onSubmit={handleSignupUser} className="space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Your Name</span></label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full pl-12 bg-gray-50 rounded-xl focus:border-[#FFA500]" required />
              </div>
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
              <div className="relative">
                <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="photo" placeholder="https://image.com/photo.jpg" className="input input-bordered w-full pl-12 bg-gray-50 rounded-xl focus:border-[#FFA500]" />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Email Address</span></label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" placeholder="email@example.com" className="input input-bordered w-full pl-12 bg-gray-50 rounded-xl focus:border-[#FFA500]" required />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Password</span></label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full pl-12 bg-gray-50 rounded-xl focus:border-[#FFA500]" required />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="form-control mt-2">
              <label className="cursor-pointer flex items-center gap-3">
                <input type="checkbox" name="tram" className="checkbox checkbox-warning rounded-md" />
                <span className="label-text text-gray-600">I agree to the <span className="text-[#FFA500] font-bold">Terms & Conditions</span></span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="btn w-full bg-[#FFA500] hover:bg-orange-600 text-white border-none py-3 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95">
              Sign Up
            </button>

            <div className="divider text-gray-400 text-sm">OR SIGNUP WITH</div>

            {/* Google Signup */}
            <button type="button" onClick={googlelogin} className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-gray-700 rounded-xl flex items-center justify-center gap-3">
              <FaGoogle className="text-red-500 text-xl" />
              Sign up with Google
            </button>
          </form>

          <p className="mt-8 text-center font-medium text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#FFA500] font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;