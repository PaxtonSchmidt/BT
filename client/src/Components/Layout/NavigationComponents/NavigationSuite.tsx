import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { boolean } from 'yup';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface Props {
    isLoggedIn: boolean;
}

export default function NavigationSuite(isLoggedIn: Props) {
    if(isLoggedIn.isLoggedIn === true) {
        return (
            <>
                <Navbar />
                <Hamburger />
                <Sidebar />
                <Outlet />
            </>
        )
    }
    return <Navigate to='/login' />
    
}