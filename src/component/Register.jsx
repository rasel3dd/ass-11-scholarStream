import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';


const Register = () => {
  const [show, setShow] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { createUser, updateUser, signInGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const axiosPublic = useAxiosSecure(); 

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

    const passwordValid = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{6,}$/;
    if (!passwordValid.test(password)) {
      setPasswordError(
        'Password must be 6+ characters, include a capital letter & a special character.'
      );
      return;
    } else setPasswordError('');

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(async () => {
            
            // ডাটাবেসে পাঠানোর অবজেক্ট
            const userInfo = {
              name,
              email,
              photo,
              role: 'Student', // বড় হাতের 'S' দিন যাতে ড্যাশবোর্ড লজিকের সাথে মিলে যায়
              createdAt: new Date()
            };

            try {
              const res = await axiosPublic.post('/users', userInfo);
              if (res.data.insertedId || res.data.message === 'User already exists') {
                setUser({ ...loggedUser, displayName: name, photoURL: photo });
                toast.success('Registration successful!');
                setTimeout(() => navigate('/'), 1500);
              }
            } catch (err) {
              console.error('Database Error:', err);
              toast.error('Failed to save user in database.');
            }
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = () => {
    signInGoogle()
      .then(async (result) => {
        const user = result.user;
        
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: 'Student', // এখানেও 'Student' (বড় হাতের S)
          createdAt: new Date()
        };
        
        try {
          // গুগল লগইনের সময়ও ডাটাবেসে ইউজার সেভ করা নিশ্চিত করুন
          await axiosPublic.post('/users', userInfo);
          setUser(user);
          toast.success('Google registration successful!');
          setTimeout(() => navigate('/'), 1500);
        } catch (error) {
          console.error("Google user save error", error);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-8'>
      <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8'>
        <h1 className='text-3xl font-bold text-center text-green-600 mb-6'>
          Create Your Account
        </h1>

        <form onSubmit={handleRegister} className='space-y-4'>
          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Full Name</label>
            <input
              type='text' name='name'
              placeholder='Enter your full name'
              className='w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
            {nameError && <p className='text-red-500 text-xs mt-1'>{nameError}</p>}
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Photo URL</label>
            <input
              type='text' name='photo'
              placeholder='Enter your photo URL'
              className='w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 font-medium text-gray-700'>Email Address</label>
            <input
              type='email' name='email'
              placeholder='Enter your email'
              className='w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
          </div>

          <div className='flex flex-col relative'>
            <label className='mb-1 font-medium text-gray-700'>Password</label>
            <input
              type={show ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password'
              className='w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400'
              required
            />
            <span
              onClick={() => setShow(!show)}
              className='absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-green-500 transition'
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && (
              <p className='text-red-500 text-xs mt-1'>{passwordError}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all py-3 font-bold shadow-md'
          >
            Create Account
          </button>

          <div className='divider text-xs text-gray-400 text-center my-2'>OR</div>

          <button
            type='button'
            onClick={handleGoogle}
            className='w-full border border-gray-300 text-gray-700 flex justify-center items-center gap-2 rounded-xl hover:bg-gray-50 transition py-2'
          >
            <FcGoogle size={22} /> Register with Google
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-green-600 font-bold hover:underline'>
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position='top-center' />
    </div>
  );
};

export default Register;