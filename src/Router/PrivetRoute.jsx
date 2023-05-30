import React, { useContext } from 'react';
import { AuthContext } from './AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        <div className="radial-progress accent-neutral" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}></div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace={true}></Navigate>
};

export default PrivetRoute;