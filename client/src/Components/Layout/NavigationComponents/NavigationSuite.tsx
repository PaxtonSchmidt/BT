import React from 'react';
import { Outlet } from 'react-router-dom';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

export default function NavigationSuite() {
    return (
        <>
            <Navbar />
            <Hamburger />
            <Sidebar />
            <Outlet />
        </>
    )
}