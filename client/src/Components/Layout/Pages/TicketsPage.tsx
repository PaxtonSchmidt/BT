import React from 'react';
import TicketList from '../../Library/Tickets/TicketList';

export default function TicketsPage() {
    return(
        <div className='pageContentContainer'>
            <div className='pageHeaderContainer'>
                <h1 className='pageHeader'>TICKETS</h1>
                <TicketList />
            </div>
        </div>
    )
}