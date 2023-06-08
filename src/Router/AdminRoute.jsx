import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [ isAdmin, isAdminLoading]  =  useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="radial-progress accent-neutral" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}></div>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};


export default AdminRoute;