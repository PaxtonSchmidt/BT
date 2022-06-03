import React from 'react';
import { useEffect } from 'react';
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
    
    useEffect(() => {
        async function getSessionState() {
            console.log(' got here')
            let response = await fetch('/users/getSessionState', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json());
            console.log(response)
            
        }
        getSessionState();
    }, [])
    

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