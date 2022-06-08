import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { SessionActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import Hamburger from './Hamburger';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface Props {
    isTeamSelected: boolean;
}

export default function NavigationSuite({ isTeamSelected }: Props) {
    const dispatch = useDispatch();
    const { updateSession } = bindActionCreators(SessionActionCreators, dispatch)
    const loginState = useSelector((state: State) => state.login)
    const sessionState = useSelector((state: State) => state.session)
    console.log(sessionState)
    let navigate = useNavigate();
    
    useEffect(() => {
        async function getSessionState() {
            let response: any = await fetch('/users/getSessionState', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 400){
                navigate('/login')
            }
            updateSession(await response.json());
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