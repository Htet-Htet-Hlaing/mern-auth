import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { data, useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContent';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = ({defaultState="Login"}) => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin ,getUserData} = useContext(AppContent);

  const [state, setState] = useState(defaultState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);

  const onSubmitHandler=async(e) => {
    try {
      e.preventDefault();
      if (state === "Sign Up") {
       const { data } = await axios.post(
         backendUrl + "/api/auth/register",
         { name, email, password },
         { withCredentials: true } 
       );
        if (data.success) {
          setIsLoggedin(true);
                    getUserData();

          navigate('/');
        }
        else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        console.log('login data', data)
        if (data.success) {
          setIsLoggedin(true);
          

          getUserData();

          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  }

  return (
    <div className=" flex items-center justify-center  min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 px-6 sm:px-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className=" absolute left-5 sm:left-20 w-28 sm:w-32 top-5 cursor-pointer"
        alt=""
      />
      <div className=" bg-slate-900 rounded-lg text-indigo-300 text-sm p-10 shadow-lg w-full sm:w-96  ">
        <h2 className=" text-3xl text-white text-center font-semibold mb-4">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-center mb-4">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to your account"}
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-3 mb-4"
          action=""
        >
          {state === "Sign Up" && (
            <div className=" flex items-center justify-center gap-5 rounded-full px-4 py-2.5 bg-[#333A5C] ">
              <img className=" w-4" src={assets.person_icon} alt="" />
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className=" bg-transparent outline-none"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className=" flex items-center justify-center gap-5 rounded-full px-4 py-2.5 bg-[#333A5C] ">
            <img className=" w-4" src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className=" bg-transparent outline-none"
              placeholder="Email"
              required
            />
          </div>
          <div className=" flex items-center justify-center gap-5 rounded-full px-4 py-2.5 bg-[#333A5C] ">
            <img className=" w-4" src={assets.lock_icon} alt="" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className=" bg-transparent outline-none"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className=" text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>
          <button className=" w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2.5 font-medium ">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className=" mb-4 text-center">
            Already have an account?{"  "}
            <span
              onClick={() => navigate("/login")}
              className=" text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className=" text-center">
            Don't have an account?{"  "}
            <span
              onClick={() => navigate("/signup")}
              className=" text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login