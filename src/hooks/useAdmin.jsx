import React from 'react';
import useAuth from './useAuth';
import useAxiosSerous from './useAxiosSerous';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSerous()

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;