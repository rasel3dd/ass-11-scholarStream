import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const [show, setShow] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { createUser, updateUser, signInGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 5) {
      setNameError('Full name must be at least 5 characters.');
      return;
    } else setNameError('');

    const passwordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,}$/;
    if (!passwordValid.test(password)) {
      setPasswordError(
        'Password must be 8+ characters and include uppercase, lowercase, number & special character.'
      );
      return;
    } else setPasswordError('');

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success('Registration successful!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err.message));
  };

  const handleGoogle = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Google registration successful!');
        setTimeout(() => navigate('/'), 1500);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8'>
        <h1 className='text-3xl font-bold text-center text-green-600 mb-6'>
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className='space-y-5'>
          {/* Name */}
          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Full Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your full name'
              className='input input-bordered w-full rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
            {nameError && <p className='text-red-500 text-sm mt-1'>{nameError}</p>}
          </div>

          {/* Photo URL */}
          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Photo URL</label>
            <input
              type='text'
              name='photo'
              placeholder='Enter your photo URL'
              className='input input-bordered w-full rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && (
              <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type='submit'
            className='btn w-full bg-green-500 text-white rounded-xl hover:bg-green-600 transition py-2'
          >
            Register
          </button>

          {/* Google Register */}
          <button
            type='button'
            onClick={handleGoogle}
            className='btn w-full border border-green-500 text-green-500 flex justify-center items-center gap-2 rounded-xl hover:bg-green-50 transition py-2'
          >
            <FcGoogle size={24} /> Register with Google
          </button>
        </form>

        <p className='text-center text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-green-600 font-semibold hover:underline'>
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
