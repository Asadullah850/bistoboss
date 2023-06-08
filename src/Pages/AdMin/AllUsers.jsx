import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitel from '../Titel/SectionTitel';
import { FaEdit, FaTrash, FaUsersCog } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSerous from '../../hooks/useAxiosSerous';

const AllUsers = () => {
    const [axiosSecure] =  useAxiosSerous();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get(`/users`)
        return res.data;
    })

    const handelMakeAdmin = (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Admin',
            denyButtonText: `Don't Admin`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/users/admin/${id}`, {

                    method: "PATCH",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            Swal.fire('Saved!', '', 'success')
                            refetch()
                        }
                        console.log(data);
                    })

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved')
            }
        })

    }

    const deleteCartProduct = (id) => {
        console.log(id);
    }
    return (
        <div className='w-[95%]'>
            <Helmet>
                <title>Bistro | All Users</title>
            </Helmet>
            <SectionTitel subheader={'---How many---'} header={'MANAGE ALL USERS'} ></SectionTitel>

            <div className=" divider"></div>
            <h3 className='text-lg mx-4'>Total Users: <span className='mx-1'>{users.length}</span></h3>

            {/*  */}

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead >
                        <tr className=' uppercase'>
                            <th className='bg-[#D1A054]'>
                                <label>
                                    #
                                </label>
                            </th>
                            <th className='bg-[#D1A054]'>Name</th>
                            <th className='bg-[#D1A054]'>Email</th>
                            <th className='bg-[#D1A054]'>Role</th>
                            <th className='bg-[#D1A054]'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={index}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{user.displayName}</span>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.roll === 'admin' ? 'admin' :
                                            <button onClick={() => handelMakeAdmin(user._id)} className="btn btn-ghost bg-[#c07c16] hover:bg-[#513408]">
                                                <FaUsersCog className=' text-white text-xl'></FaUsersCog>
                                            </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => deleteCartProduct(row._id)} className="btn btn-ghost bg-red-600"><FaTrash className=' text-white'></FaTrash></button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllUsers;