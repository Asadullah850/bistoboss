import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HiShoppingCart, HiHome, HiCalendar, HiShoppingBag, } from "react-icons/hi";
import { FaEnvelope, FaBook, FaEnvelopeOpenText, FaAlignJustify, FaUsers, FaListUl } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { MdRestaurant } from "react-icons/md";
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div className="drawer drawer-mobile">
            {/* <div className=""> */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
            </div>
            {/* </div> */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 bg-[#D1A054] text-base-content uppercase">
                    <div className="mb-4 mx-auto font-bold">
                        <h1 className='my-2 text-xl'>BISTRO BOSS</h1>
                        <p>Restaurant</p>
                    </div>
                    <hr className='h-[1px] opacity-50 transform mb-4' />
                    {
                        isAdmin ?
                            <>
                                <li className='text-black'>
                                    <NavLink to='/dashboard/adminhome'>
                                        <HiHome className='text-xl'></HiHome>
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li className='text-black'>
                                    <NavLink to='/dashboard/addItem'>
                                        <MdRestaurant className='text-xl'></MdRestaurant>
                                        add items
                                    </NavLink>
                                </li>
                                <li className='text-black'>
                                    <NavLink to='/dashboard/manageitems'>
                                        < FaListUl className='text-xl'></FaListUl>
                                        manage items
                                    </NavLink>
                                </li>
                                <li className='text-black'>
                                    <NavLink to='/dashboard/mycart'>
                                        <FaBook className='text-xl'></FaBook>
                                        Manage bookings
                                    </NavLink>
                                </li>
                                <li className='text-black'>
                                    <NavLink to='/dashboard/allusers'>
                                        <FaUsers className='text-xl'></FaUsers>
                                        all users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className='text-black'>
                                    <NavLink to={'/dashboard/userhome'}>
                                        <HiHome className='text-xl'></HiHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li className='text-black'><NavLink to={'/'}><HiCalendar className='text-xl'></HiCalendar>reservation</NavLink></li>
                                <li className='text-black'><NavLink to={'/'}><GiWallet className='text-xl'></GiWallet>payment history</NavLink></li>
                                <li className='text-black'>
                                    <NavLink to={'/dashboard/mycart'}><HiShoppingCart className='text-xl'></HiShoppingCart>
                                        My Cart
                                        <div className="badge badge-secondary">+{cart?.length || 0}</div>
                                    </NavLink>
                                </li>
                                <li className='text-black'><a><FaEnvelopeOpenText className='text-xl'></FaEnvelopeOpenText>add review</a></li>
                                <li className='text-black'><a><BsFillCalendarPlusFill className='text-xl'></BsFillCalendarPlusFill>my booking</a></li>
                            </>
                    }

                    <hr className='h-1 my-4 bg-slate-100' />

                    <li className='text-black'><NavLink to={'/'}><HiHome className='text-xl'></HiHome>home</NavLink></li>
                    <li className='text-black'>
                        <NavLink to={'/menu'}><FaAlignJustify className='text-xl'></FaAlignJustify>
                            menu
                        </NavLink>
                    </li>
                    <li className='text-black'><NavLink to={'/'}><HiShoppingBag className='text-xl'></HiShoppingBag>shop</NavLink></li>
                    <li className='text-black'><NavLink to={'/'}><FaEnvelope className='text-xl'></FaEnvelope>contact</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard