import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import useRole from '../hooks/useRole'; 
import Loading from '../component/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole(); 
    const location = useLocation();

    if (authLoading || isRoleLoading) {
        return <Loading />;
    }

    if (user && role === 'Admin') {
        return children;
    }

    return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;