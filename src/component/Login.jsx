import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; 
import { AuthContext } from '../auth/AuthProvider';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const { signIn, signInGoogle, resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    
    const handleUserRedirection = async (email) => {
        try {
            
            const { data } = await axios.post('http://localhost:5000/jwt', { email });
            if (data.token) {
                localStorage.setItem('access-token', data.token);
            }

            
            const res = await axios.get(`http://localhost:5000/users/role/${email}`);
            const role = res.data.role;

            if (role === 'Admin') {
                navigate('/dashboard/admin-home'); 
            } else if (role === 'Moderator') {
                navigate('/dashboard/moderator-home');
            } else {
                navigate(location.state ? location.state : "/");
            }
        } catch (err) {
            console.error("Redirection Error:", err);
            navigate("/");
        }
    };

    const handleGoogle = () => {
        signInGoogle()
            .then(result => {
                toast.success('Google sign-in successful');
                
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'Student' 
                }
                axios.post('http://localhost:5000/users', userInfo)
                    .then(() => {
                        handleUserRedirection(result.user.email);
                    })
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                toast.success('Login successful!');
                handleUserRedirection(result.user.email);
            })
            .catch((error) => {
                setError("Invalid email or password. Please try again.");
            });
    };

    
    const handleForget = () => {
        const email = prompt("Enter your email for password reset:");
        if (!email) return;
        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent!');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4'>
            <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8'>
                <h1 className='text-3xl font-bold text-center text-green-600 mb-6'>Welcome Back!</h1>

                <form onSubmit={handleLogin} className='space-y-5'>
                    <div className='flex flex-col'>
                        <label className='mb-1 font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            className='input input-bordered w-full rounded-xl px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-green-400'
                            required
                        />
                    </div>

                    <div className='flex flex-col relative'>
                        <label className='mb-1 font-medium text-gray-700'>Password</label>
                        <input
                            type={show ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter your password'
                            className='input input-bordered w-full rounded-xl px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-green-400'
                            required
                        />
                        <span onClick={() => setShow(!show)} className='absolute right-4 top-10 cursor-pointer text-gray-500'>
                            {show ? <FaRegEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className='text-right'>
                        <button type='button' onClick={handleForget} className='text-sm text-green-500 hover:underline'>
                            Forgot password?
                        </button>
                    </div>

                    {error && <p className='text-red-500 text-sm font-medium'>{error}</p>}

                    <button type='submit' className='btn w-full bg-green-500 text-white rounded-xl hover:bg-green-600 transition py-2 font-semibold shadow-md'>
                        Login
                    </button>

                    <div className="divider text-gray-400 text-sm">OR</div>

                    <button type='button' onClick={handleGoogle} className='btn w-full border border-gray-300 text-gray-700 flex justify-center items-center gap-2 rounded-xl hover:bg-gray-50 transition py-2'>
                        <FcGoogle size={24} /> Login with Google
                    </button>
                </form>

                <p className='text-center text-gray-500 mt-6'>
                    Don't have an account? <Link to='/register' className='text-green-600 font-semibold hover:underline'>Register</Link>
                </p>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Login;