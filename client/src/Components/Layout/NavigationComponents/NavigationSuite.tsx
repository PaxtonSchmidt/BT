import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { boolean } from 'yup';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface Props {
    isLoggedIn: boolean;
    isTeamSelected: boolean;
}

export default function NavigationSuite({ isLoggedIn, isTeamSelected }: Props) {
    if(isLoggedIn === true) {
        if(isTeamSelected === true){
            return (
                <>
                    <Navbar />
                    <Hamburger />
                    <Sidebar />
                    <Outlet />
                </>
            )
        } return <Navigate to='/selectTeam' />
    }

    return <Navigate to='/login' />
}