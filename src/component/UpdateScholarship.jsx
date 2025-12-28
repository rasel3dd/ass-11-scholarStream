import React from 'react';

import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';

const UpdateScholarship = () => {
    const scholarship = useLoaderData(); 
    const { _id, scholarshipName, universityName, degree, applicationFees, subjectCategory } = scholarship;
    
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/scholarships/${_id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Scholarship details updated successfully.", "success");
                navigate('/dashboard/manage-scholarships');
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update scholarship", "error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Update Scholarship</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-700">Scholarship Name</label>
                    <input 
                        {...register("scholarshipName")}
                        defaultValue={scholarshipName}
                        className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-700">University Name</label>
                    <input 
                        {...register("universityName")}
                        defaultValue={universityName}
                        className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-700">Subject Category</label>
                    <select {...register("subjectCategory")} defaultValue={subjectCategory} className="border border-gray-300 rounded-lg p-3">
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-700">Degree</label>
                    <select {...register("degree")} defaultValue={degree} className="border border-gray-300 rounded-lg p-3">
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold text-gray-700">Application Fees ($)</label>
                    <input 
                        type="number"
                        {...register("applicationFees")}
                        defaultValue={applicationFees}
                        className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="md:col-span-2 mt-6">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
                        Update Scholarship Info
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateScholarship;