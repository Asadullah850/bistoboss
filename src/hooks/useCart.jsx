import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSerous from './useAxiosSerous';

const useCart = () => {
    const { user, loading } = useAuth();
    // console.log(user);
    const [axiosSecure] = useAxiosSerous();
    // console.log(axiosSecure);
    const { refetch, data: cart = [] } = useQuery({
        // const token = localStorage.getItem('token')
        queryKey: ['cart', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log(';res form axios', res);
            return res.data;
        }
    })
    return [cart, refetch]

}
export default useCart;
