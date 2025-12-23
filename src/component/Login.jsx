import React, {  useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [resetMessage, setResetMessage] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] =useState("");
  const {signIn, signInGoogle, resetPassword} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleForget = () =>{
const email = prompt("Password reset email sent! Check your inbox.");
if (!email) return;
resetPassword(email)
.then(() => {
        setResetMessage("Password reset email sent! Check your inbox.");
        setError("");
        toast.success('Your password reset successful');
      })
      .catch((err) => {
        setError(err.message);
        setResetMessage("");
      });

  };
  const handleGoogle = () =>{
signInGoogle().then(result => {
    const user = result.user;
    
    toast.success('Your password Google sing in successful');
    setTimeout(() =>{
      navigate(`${location.state ? location.state : "/"}`);
    },1500);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode, errorMessage);
    // ..
    });

  };
  const handleLogin = (e) =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signIn(email, password)
    .then(result => {
    const user = result.user;
    toast.success('Your password sing in successful');
    setTimeout(() => {
  navigate(location.state ? location.state : "/");
}, 1500);
    
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode, errorMessage);
    // ..
    });

  };
    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8'>
        <h1 className='text-3xl font-bold text-center text-green-600 mb-6'>
          Welcome Back!
        </h1>

        <form onSubmit={handleLogin} className='space-y-5'>
          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='input input-bordered w-full rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
          </div>

          <div className='flex flex-col relative'>
            <label className='mb-1 font-medium text-gray-700'>Password</label>
            <input
              type={show ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password'
              className='input input-bordered w-full rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
            <span
              onClick={() => setShow(!show)}
              className='absolute right-4 top-9 cursor-pointer text-gray-500'
            >
              {show ? <FaRegEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className='text-right'>
            <button
              type='button'
              onClick={handleForget}
              className='text-sm text-green-500 hover:underline'
            >
              Forgot password?
            </button>
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {resetMessage && <p className='text-green-600 text-sm'>{resetMessage}</p>}

          <button
            type='submit'
            className='btn w-full bg-green-500 text-white rounded-xl hover:bg-green-600 transition py-2'
          >
            Login
          </button>

          <button
            type='button'
            onClick={handleGoogle}
            className='btn w-full border border-green-500 text-green-500 flex justify-center items-center gap-2 rounded-xl hover:bg-green-50 transition py-2'
          >
            <FcGoogle size={24} /> Login with Google
          </button>
        </form>

        <p className='text-center text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='text-green-600 font-semibold hover:underline'>
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
    );
};

export default Login;