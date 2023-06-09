import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../hooks/useCart';
import SectionTitel from '../Titel/SectionTitel';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    const Total = cart.reduce((sum, val) => sum + val.price, 0)

    const deleteCartProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/cart/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                    })
            }
        })

        // console.log(id);
    }
    return (
        <div className='w-full h-screen'>
            <Helmet>
                <title>Bistro | My Cart</title>
            </Helmet>
            <SectionTitel subheader={'---My Cart---'} header={'WANNA ADD MORE ?'} ></SectionTitel>
            <hr className='h-[2px] bg-slate-800/10 mb-10' />
            <div className="flex justify-evenly my-2">
                <h3 className='text-lg'>Total Items: <span className='mx-1'>{cart.length || 0}</span></h3>
                <h3 className='text-lg'>Total Price: <span className='mx-1'>${Total}</span></h3>
                <Link to='/dashboard/payment'>
                <button className='btn btn-sm bg-[#D1A054] border-none'>pay</button>
                </Link>
            </div>
            <div className="w-[95%] mx-auto">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead >
                            <tr >
                                <th className='bg-[#D1A054]'>
                                    <label>
                                        #
                                    </label>
                                </th>
                                <th className='bg-[#D1A054]'>ITEM IMAGE</th>
                                <th className='bg-[#D1A054]'>ITEM NAME</th>
                                <th className='bg-[#D1A054]'>PRICE</th>
                                <th className='bg-[#D1A054]'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((row, index) => <tr key={index}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={row.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">{row.name}</span>
                                    </td>
                                    <td>${row.price}</td>
                                    <th>
                                        <button onClick={() => deleteCartProduct(row._id)} className="btn btn-ghost bg-red-600"><FaTrash className=' text-white'></FaTrash></button>
                                    </th>
                                </tr>)
                            }
                            {/* row 1 */}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;