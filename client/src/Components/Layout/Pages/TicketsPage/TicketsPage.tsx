import React from 'react';
import TicketList from '../../../Library/Tickets/TicketList';
import FormAndManage from './FormAndManage';

export default function TicketsPage() {
    return(
        <div className='pageContentContainer'>
            <div className='pageHeaderContainer'>
                <h1 className='pageHeader'>TICKETS</h1>
                <TicketList />
                <FormAndManage />
            </div>
        </div>
    )
}