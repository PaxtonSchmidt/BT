import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import TicketList from '../../../Library/Tickets/TicketList';
import FormAndDetails from './FormAndDetails';

interface Props {
    isTeamSelected: boolean;
}

export default function TicketsPage({ isTeamSelected } : Props) {
    const loginState = useSelector((state: State) => state.login)
    
    if(loginState === 1) {
        if(isTeamSelected === true){
            return(
                    <div className='pageContentContainer' >
                            <FormAndDetails />
                            <TicketList />
                    </div>
            )
        } return <Navigate to='/selectTeam' />
    }
    return <Navigate to='/login' />
    
}