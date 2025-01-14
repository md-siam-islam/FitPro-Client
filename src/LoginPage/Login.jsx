import { Helmet } from "react-helmet";
import LoginLotti from "../assets/LottiFile/Login.json";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { userLogin, setUser,userGoogleLogin } = useContext(AuthContext);
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
          title: "Login Successfull ",
          showConfirmButton: false,
          timer: 1500,
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
  };

  const googlelogin =() => {
          userGoogleLogin()
          .then((res) => {
              const user = res.user
              setUser(user)
              if(user.email){
                  navigate('/')
              }
  
              return Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Google SignUp successful! ",
                  showConfirmButton: false,
                  timer: 1500
                });
          })
      }
  return (
    <div className="my-5 w-11/12 mx-auto">
      <Helmet>
        <title>FitPro || Login</title>
      </Helmet>
      <Link to={"/"}>
        <button className="btn bg-[#FFA500] text-white font-semibold">
          <FaArrowLeft></FaArrowLeft> Back to Home
        </button>
      </Link>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={LoginLotti}
            loop={true}
            className="w-full h-full max-h-96 lg:max-h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 space-y-6">
          <h1 className="font-semibold text-2xl text-center">
            Login your account
          </h1>
          <form
            onSubmit={handleUserLogin}
            className="w-full flex flex-col space-y-4"
          >
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

            <div className="form-control mt-6 w-full">
              <button className="btn bg-[#FFA500] w-full p-4 rounded-lg">
                Sign Up
              </button>
            </div>
            <div className="divider">OR</div>

            <div className="form-control mt-6 mb-4">
              <button onClick={googlelogin} className="btn btn-neutral">
                {" "}
                <img
                  className="h-8"
                  src="https://img.icons8.com/?size=48&id=V5cGWnc9R4xj&format=png"
                  alt=""
                />
                Sign in With Google
              </button>
            </div>
            <div>
              <h1 className="font-semibold text-center">
                Don’t Have An Account?
                <Link to={"/signup"} className="text-[#FFA500]">
                  {" "}
                  Register
                </Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
