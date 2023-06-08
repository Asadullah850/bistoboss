import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const axiosSecure = axios.create({
    baseURL:'http://localhost:3000',
});

const useAxiosSerous = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();


    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        axiosSecure.interceptors.response.use(
            (response) => response,
            async(error) =>{
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login')
                }
                return Promise.reject(error);
            }
        );
    },[logOut, navigate, axiosSecure])

    return [ axiosSecure];
};

export default useAxiosSerous;