import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { Link } from 'react-router';

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const res = await axiosSecure.get('/scholarships');
            setScholarships(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/scholarships/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Scholarship has been removed.", "success");
                        const remaining = scholarships.filter(s => s._id !== id);
                        setScholarships(remaining);
                    }
                } catch (error) {
                    Swal.fire("Error", "Could not delete scholarship", "error");
                }
            }
        });
    };

    if (loading) return <div className="text-center py-20 font-bold text-green-600">Loading Scholarships...</div>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Manage Scholarships</h2>
                <p className="text-sm text-gray-500">Total: {scholarships.length} scholarships</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                            <th className="px-4 py-4 border-b">Scholarship Name</th>
                            <th className="px-4 py-4 border-b">University</th>
                            <th className="px-4 py-4 border-b">Subject Category</th>
                            <th className="px-4 py-4 border-b">Degree</th>
                            <th className="px-4 py-4 border-b text-center">App Fees</th>
                            <th className="px-4 py-4 border-b text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {scholarships.map((s) => (
                            <tr key={s._id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-4 font-medium text-gray-800">{s.scholarshipName}</td>
                                <td className="px-4 py-4 text-gray-600 text-sm">{s.universityName}</td>
                                <td className="px-4 py-4 text-sm">{s.subjectCategory}</td>
                                <td className="px-4 py-4">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold uppercase">
                                        {s.degree}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center text-gray-600 font-semibold">
                                    ${s.applicationFees}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                            <Link to={`/dashboard/update-scholarship/${s._id}`}>
    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
        <FaEdit size={18} />
    </button>
</Link>
                                        <button 
                                            onClick={() => handleDelete(s._id)}
                
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FaTrashAlt size={18} />
                                            
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;