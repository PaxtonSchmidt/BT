import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../../../Redux/reducers';
import TicketList from '../../../Library/Tickets/TicketList';
import FormAndManage from './FormAndManage';

interface Props {
    isTeamSelected: boolean;
}

export default function TicketsPage({ isTeamSelected } : Props) {
    const loginState = useSelector((state: State) => state.login)
    console.log(loginState)
    
    if(loginState === 1) {
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