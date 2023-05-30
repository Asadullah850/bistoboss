import React,{useContext} from 'react';
import { AuthContext } from "../Router/AuthProviders"
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch,isLoading, isError, data: cart = [], error } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/carts?email=${user.email}`)
            return response.json();
        },
    })
    return [cart, refetch]

}
export default useCart;
