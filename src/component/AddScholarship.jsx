import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { AuthContext } from '../auth/AuthProvider';

const AddScholarship = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    // প্রাথমিক স্টেট (যা রিসেট করতে কাজে লাগবে)
    const initialFormState = {
        scholarshipName: '',
        universityName: '',
        image: '',
        country: '',
        city: '',
        worldRank: '',
        subjectCategory: '',
        scholarshipCategory: '',
        degree: '',
        tuitionFees: '',
        applicationFees: '',
        serviceCharge: '',
        deadline: '',
        postDate: new Date().toISOString().split('T')[0], 
        userEmail: user?.email || ''
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ডাটাবেসে পাঠানোর আগে ডাটা টাইপ ঠিক করে নেওয়া (Number conversions)
        const submissionData = {
            ...formData,
            userEmail: user?.email, // লেটেস্ট ইমেইল নিশ্চিত করা
            applicationFees: parseFloat(formData.applicationFees) || 0,
            serviceCharge: parseFloat(formData.serviceCharge) || 0,
            worldRank: parseInt(formData.worldRank) || 0
        };

        try {
            // আপনার সার্ভারের এন্ডপয়েন্ট '/scholarships' হতে হবে
            const response = await axiosSecure.post('/scholarships', submissionData);
            
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Scholarship Added Successfully",
                    icon: "success",
                    confirmButtonColor: "#2563eb"
                });

                // ফর্মটি পুরোপুরি রিসেট করা
                setFormData(initialFormState);
                e.target.reset(); // HTML ফর্ম এলিমেন্ট রিসেট
            }
        } catch (error) {
            console.error("Submission Error:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to add scholarship. Check console.",
                icon: "error"
            });
        }
    };

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4'>Add New Scholarship</h2>
                
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    
                    {/* Scholarship Name */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Scholarship Name</label>
                        <input 
                            type='text' name='scholarshipName' required
                            placeholder="e.g. Full Funding Scholarship"
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.scholarshipName} onChange={handleChange}
                        />
                    </div>

                    {/* University Name */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>University Name</label>
                        <input 
                            type='text' name='universityName' required
                            placeholder="University of Oxford"
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.universityName} onChange={handleChange}
                        />
                    </div>

                    {/* Country */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Country</label>
                        <input 
                            type='text' name='country' required
                            placeholder="e.g. USA"
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.country} onChange={handleChange}
                        />
                    </div>

                    {/* City */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>City</label>
                        <input 
                            type='text' name='city' required
                            placeholder="e.g. London"
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.city} onChange={handleChange}
                        />
                    </div>

                    {/* Image URL */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Image URL</label>
                        <input 
                            type='url' name='image' required
                            placeholder="https://image-link.com"
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.image} onChange={handleChange}
                        />
                    </div>

                    {/* Application Fees */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Application Fees ($)</label>
                        <input 
                            type='number' name='applicationFees' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.applicationFees} onChange={handleChange}
                        />
                    </div>

                    {/* Service Charge */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Service Charge ($)</label>
                        <input 
                            type='number' name='serviceCharge' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.serviceCharge} onChange={handleChange}
                        />
                    </div>

                    {/* Deadline */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Application Deadline</label>
                        <input 
                            type='date' name='deadline' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.deadline} onChange={handleChange}
                        />
                    </div>

                    {/* World Rank */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>World Rank</label>
                        <input 
                            type='number' name='worldRank' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.worldRank} onChange={handleChange}
                        />
                    </div>

                    {/* Subject Category */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Subject Category</label>
                        <select 
                            name='subjectCategory' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.subjectCategory} onChange={handleChange}
                        >
                            <option value=''>Select Subject</option>
                            <option value='Agriculture'>Agriculture</option>
                            <option value='Engineering'>Engineering</option>
                            <option value='Doctor'>Doctor</option>
                        </select>
                    </div>

                    {/* Scholarship Category */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Scholarship Category</label>
                        <select 
                            name='scholarshipCategory' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.scholarshipCategory} onChange={handleChange}
                        >
                            <option value=''>Select Category</option>
                            <option value='Full Funding'>Full Funding</option>
                            <option value='Partial'>Partial</option>
                            <option value='Research'>Research</option>
                        </select>
                    </div>

                    {/* Degree */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Degree</label>
                        <select 
                            name='degree' required
                            className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
                            value={formData.degree} onChange={handleChange}
                        >
                            <option value=''>Select Degree</option>
                            <option value='Bachelor'>Bachelor</option>
                            <option value='Masters'>Masters</option>
                            <option value='PhD'>PhD</option>
                        </select>
                    </div>

                    <div className='md:col-span-2 mt-4'>
                        <button 
                            type='submit' 
                            className='w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition shadow-lg'
                        >
                            Add Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;