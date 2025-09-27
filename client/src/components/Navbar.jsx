import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {assets} from "../assets/assets.js"
import { AppContent } from "../context/AppContent.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData,backendUrl,setUserData,setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp=async() => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  const logout = async () => {
    try {
          axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }    
  }

  
  
  return (
    <div className=" w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 mb-10">
      <img onClick={() => navigate("/")} src={assets.logo} alt="" className=" w-28 sm:w-32" />
      {userData ? (
        <div className=" w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className=" absolute top-0 right-0 hidden group-hover:block rounded text-black z-10 pt-10">
            <ul className=" list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className=" hover:bg-gray-200 cursor-pointer px-2 py-1">
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="hover:bg-gray-200 cursor-pointer px-2 py-1">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className=" border border-gray-500 rounded-full flex items-center gap-2 px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
}

export default Navbar