import React from 'react';
import { Navigate } from 'react-router-dom';
import TicketList from '../../../Library/Tickets/TicketList';
import FormAndManage from './FormAndManage';

interface Props {
    isLoggedIn: boolean;
    isTeamSelected: boolean;
}

export default function TicketsPage({ isLoggedIn, isTeamSelected } : Props) {
    if(isLoggedIn === true) {
        if(isTeamSelected === true){
            return(
                <div className='pageContentContainer'>
                    <div>
                        <FormAndManage />
                        <TicketList />
                    </div>
                </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
    
}