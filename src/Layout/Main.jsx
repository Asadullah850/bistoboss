import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Home/Navbar';

const Main = () => {
    const location = useLocation();
    const noHedarFooter = location.pathname.includes('login')
    return (
        <div className=''>
            {noHedarFooter || <Navbar ></Navbar>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;