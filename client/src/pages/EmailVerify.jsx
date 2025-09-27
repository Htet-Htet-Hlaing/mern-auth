import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin,userData,getUserData } = useContext(AppContent);
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

  const onSubmitHandler=async(e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData]);
  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-300 min-h-screen px-6 sm:px-0">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className=" absolute left-5 sm:left-20 w-28 sm:w-32 top-5 cursor-pointer"
        alt=""
      />
      <form
        onSubmit={onSubmitHandler}
        action=""
        className=" bg-slate-900 rounded-lg shadow-lg text-sm p-8 w-96 "
      >
        <h1 className=" text-2xl font-bold text-center text-white mb-4">
          Email Verify OTP
        </h1>
        <p className=" text-sm font-semibold text-center text-indigo-300 mb-6">
          Enter 6-digit code sent to your email id
        </p>
        <div
          onPaste={handleLPaste}
          className=" flex justify-between mb-6">
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
        <button
          className=" w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full ">
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify