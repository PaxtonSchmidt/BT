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
    let navigate = useNavigate();
    

    useEffect(() => {
        async function getSessionState() {
            let response: any = await fetch('/users/getSessionState', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            if(response.status === 400){
                navigate('/login')
            }
            updateSession(await response);
        }
        getSessionState();
    }, [])

    let role = 3 //defaults to dev, sets to actual role when the sessionState arrives
    role = sessionState.currentTeam?.team_role;

    if(loginState === 1) {
        if(isTeamSelected === true){
            return (
                <>
                    <Navbar />
                    <Hamburger />
                    <Sidebar teamRole={role}/>
                    <Outlet />
                </>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
}