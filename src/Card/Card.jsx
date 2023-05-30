import React, { useContext } from 'react';
import { AuthContext } from '../Router/AuthProviders';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Card = ({ item }) => {
    const { user } = useContext(AuthContext)
    const { image, price, name, recipe, category, _id } = item;
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();
    const handelShoppingCard = (item) => {
        console.log(item);
        if (user && user.email) {
            const cartItems = { cartItemId: _id, category, image, name, price, email: user.email }
            fetch(`http://localhost:3000/cart`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItems)

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        refetch();
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Add in successfully'
                        })
                    } else {
                        // warning
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'warning',
                            title: 'Please Log In Now'
                        })
                        navigate('/login')

                    }
                })

        }
    }
    return (
        <div className="card card-compact w-full text-left shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Recipe: {recipe}</p>
                <p>Price: <span className=' text-2xl'>$ {price}</span></p>
                <div className="card-actions justify-center">
                    <button onClick={() => handelShoppingCard(item)} className="btn btn-primary border-b-4 border-yellow-500 text-yellow-800 bg-white hover:text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;