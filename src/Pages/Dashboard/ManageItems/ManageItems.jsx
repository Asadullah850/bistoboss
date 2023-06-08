import React from 'react';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async';
import SectionTitel from '../../Titel/SectionTitel';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSerous from '../../../hooks/useAxiosSerous';

const ManageItems = () => {
    const [menu, , refetch] = useMenu()
    // console.log(menu);
    const [ axiosSecure ] = useAxiosSerous()

    const handelDelete = (item) =>{
        console.log(item);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
            console.log('inside');
            axiosSecure.delete(`/menu/${item}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
            .then(error => {
                console.log(error)
            })
            
            }
          })
    }
    return (
        <div className='m-2 h-screen'>
            <Helmet>
                <title>Bistro | Add Item</title>
            </Helmet>
            <SectionTitel subheader={" ---Hurry Up!---"} header={'MANAGE ALL ITEMS'} ></SectionTitel>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item.id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>

                                </td>
                                <td className="font-bold">
                                    {item.name}
                                </td>
                                <td className='text-left'>
                                    {item.price}
                                </td>
                                <td>Indigo</td>
                                <th>
                                    <button className="btn btn-ghost text-white bg-[#D1A054] text-xl font-bold"><FaEdit className=''></FaEdit></button>
                                </th>
                                <th>
                                    <button onClick={()=>handelDelete(item._id)} className="btn btn-ghost  text-white bg-red-900 text-xl font-bold "><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageItems;