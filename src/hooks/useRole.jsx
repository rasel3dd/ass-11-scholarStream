import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        // যদি ইউজার না থাকে তবে লোডিং ফলস করে দাও
        if (!loading && !user) {
            setIsRoleLoading(false);
            return;
        }

        if (user?.email && !loading) {
            setIsRoleLoading(true); // রিকোয়েস্ট শুরু হওয়ার আগে ট্রু করা ভালো
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                })
                .catch(err => {
                    console.error("Role fetching error:", err);
                })
                .finally(() => {
                    setIsRoleLoading(false);
                });
        }
    }, [user?.email, loading]); // শুধু email এবং loading-এর ওপর নজর রাখা যথেষ্ট

    return [role, isRoleLoading];
};

export default useRole;