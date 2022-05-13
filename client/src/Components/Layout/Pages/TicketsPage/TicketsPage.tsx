import React from 'react';
import { Navigate } from 'react-router-dom';
import TicketList from '../../../Library/Tickets/TicketList';
import FormAndManage from './FormAndManage';

interface Props {
    isAuth: boolean;
}

export default function TicketsPage(isAuth: Props) {
    if(isAuth.isAuth === true) {
        return(
            <div className='pageContentContainer'>
                <div className='pageHeaderContainer'>
                    <h1 className='pageHeader'>TICKETS</h1>
                    <FormAndManage />
                    <TicketList />
                </div>
            </div>
        )
    }
    return <Navigate to='/login' />
    
}