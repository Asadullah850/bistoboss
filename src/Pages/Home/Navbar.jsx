import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from '../../Router/AuthProviders';
import { HiUser, HiShoppingCart } from "react-icons/hi";
import useCart from '../../hooks/useCart';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [ cart ] = useCart();
    console.log(cart);
    const handelLogOut = () => {
        logOut().then(() => { }).catch((error) => {});
    }
    return (
        <div className="navbar bg-black/50 text-white fixed z-10 w-[95%] mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className=''><Link to='/'>Home</Link></li>
                        <li className=''><Link to='/menu'>Menu</Link></li>
                        <li className=''><Link to='/order'>Order</Link></li>
                        <li className=''><Link to='/login'>Login</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">FootGhor</a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/menu'>Menu</NavLink></li>
                    <li><NavLink to='/order/salad'>Order</NavLink></li>
                </ul>
                <Link to={'/dashboard/mycart'}>
                    <button className="btn btn-outline gap-2">
                        <HiShoppingCart className=' text-yellow-400 text-xl'></HiShoppingCart>
                        <div className="badge badge-secondary">+{cart?.length || 0}</div>
                    </button>
                </Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-ghost ">
                        {
                            user ? <a className="btn btn-ghost normal-case text-xl">{user.displayName}</a>
                                :
                                <a className="btn">Register Now</a>
                        }
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-500 rounded-box ">
                        {
                            user ?
                                <>
                                    <li onClick={handelLogOut}> <a>LogOut</a></li>
                                </>
                                :
                                <>
                                    <li><NavLink to='/login'>Login</NavLink></li>
                                    <li><NavLink to='/register'>Register</NavLink></li>
                                </>

                        }
                    </ul>
                </div>
                <div className="w-10 rounded-full">
                    {
                        user ? <img className='rounded-full' src={user.photoURL} /> : <HiUser></HiUser>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;