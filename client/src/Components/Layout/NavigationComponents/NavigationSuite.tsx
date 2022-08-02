import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { SessionActionCreators, TeammatesActionCreators, TicketsActionCreators } from '../../../Redux';
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
    const { updateTeammates } = bindActionCreators(TeammatesActionCreators, dispatch)
    const { updateTickets } = bindActionCreators(TicketsActionCreators, dispatch)
    const loginState = useSelector((state: State) => state.login)
    const sessionState = useSelector((state: State) => state.session)
    const isSidebarExtensionPreferred = window.localStorage.getItem('sbEX') === 'true'
    const [isExpanded, setIsExpanded] = useState<boolean>(isSidebarExtensionPreferred);
    let navigate = useNavigate();

    async function getSessionState() {
        let response: any = await fetch('/users/getSessionState', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res)
        if(response.status === 400){
            navigate('login')
        }
        updateSession(await response.json());
    }
    async function getTeammates(){
        let response: any = fetch('/projects/getUsersOnTeam', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        return updateTeammates(await response)
    }
    async function getTickets(){
        let response: any = fetch('/tickets/getTickets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        updateTickets(await response)
    }
    useEffect(() => {
        if(loginState === 1){
            getSessionState();
            getTeammates();
            getTickets();
        }
    }, [])

    let role = 3 //defaults to dev, sets to actual role when the sessionState arrives
    role = sessionState.currentTeam?.team_role;

    if(loginState === 1) {
        if(isTeamSelected === true){
            return (
                <>
                    <Navbar />
                    <Hamburger setIsSideBarExpanded={setIsExpanded} isSideBarExpanded={isExpanded}/>
                    <Sidebar teamRole={role} isExpanded={isExpanded}/>
                    <Outlet />
                </>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
}