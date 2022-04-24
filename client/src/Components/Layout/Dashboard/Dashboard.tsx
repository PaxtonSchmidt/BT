import React from 'react';
import FeedList from '../../Library/Feed/FeedList';
import TicketList from '../../Library/Tickets/TicketList';

export default function Dashboard() {
    return(
        <>
            <TicketList />
            <FeedList />
        </>
    )
}