import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { boolean } from 'yup';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface Props {
    isAuth: boolean;
}

export default function NavigationSuite(isAuth: Props) {
    if(isAuth) {
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