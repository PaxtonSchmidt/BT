import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { boolean } from 'yup';
import { State } from '../../../Redux/reducers';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface Props {
    isTeamSelected: boolean;
}

export default function NavigationSuite({ isTeamSelected }: Props) {
    const loginState = useSelector((state: State) => state.login)
    console.log(loginState)
    
    if(loginState === 1) {
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