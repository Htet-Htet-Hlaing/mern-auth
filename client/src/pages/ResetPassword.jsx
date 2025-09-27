import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContent'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);
    const handleInput=(e,index) => {
      if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
    const handleKeyDown=(e,index) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handleLPaste=(e) => {
      const paste = e.clipboardData.getData("text");
      const pasteArray = paste.split('');
      pasteArray.forEach((char,index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      })
    }
  
  const onSubmitEmail=async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp=async(e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword=async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email,otp,newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    isEmailSent && isOtpSubmitted 
  },[isEmailSent,isOtpSubmitted])
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 min-h-screen px-6 sm:px-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className=" absolute left-5 sm:left-20 w-28 sm:w-32 top-5 cursor-pointer"
        alt=""
      />
      <div className=" flex items-center justify-center gap-5">
        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className=" bg-slate-900 rounded-lg shadow-lg text-sm p-8 w-96 "
          >
            <h1 className=" text-2xl font-bold text-center text-white mb-4">
              Reset Password
            </h1>
            <p className=" text-sm font-semibold text-center text-indigo-300 mb-6">
              Enter your registered email address
            </p>
            <div className=" flex items-center justify-center gap-5 rounded-full px-4 py-2.5 bg-[#333A5C] ">
              <img className=" w-4" src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className=" bg-transparent outline-none text-white"
                placeholder="Email"
                required
              />
            </div>
            <button className=" mt-6 w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full ">
              Submit
            </button>
          </form>
        )}

        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitOtp}
            className=" bg-slate-900 rounded-lg shadow-lg text-sm p-8 w-96 "
          >
            <h1 className=" text-2xl font-bold text-center text-white mb-4">
              Email Verify OTP
            </h1>
            <p className=" text-sm font-semibold text-center text-indigo-300 mb-6">
              Enter 6-digit code sent to your email id
            </p>
            <div onPaste={handleLPaste} className=" flex justify-between mb-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className=" w-12 h-12 text-center text-white bg-[#333A5C] rounded-md "
                  />
                ))}
            </div>
            <button className=" w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full ">
              Verify Email
            </button>
          </form>
        )}

        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className=" bg-slate-900 rounded-lg shadow-lg text-sm p-8 w-96 "
          >
            <h1 className=" text-2xl font-bold text-center text-white mb-4">
              New Password
            </h1>
            <p className=" text-sm font-semibold text-center text-indigo-300 mb-6">
              Enter new password below
            </p>
            <div className=" flex items-center justify-center gap-5 rounded-full px-4 py-2.5 bg-[#333A5C] ">
              <img className=" w-4" src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                className=" bg-transparent outline-none text-white"
                placeholder="Password"
                required
              />
            </div>
            <button className=" mt-6 w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full ">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword