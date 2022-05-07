import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import TicketListItem from './TicketListItem';

function Tickets() {
    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {
        fetch('/tickets/getTickets')
        .then((res => {
            if(res.ok) {
                return res.json();
            }
        }))
        .then(jsonRes => setTickets(jsonRes));
    }, []) //empty array passed as second argument to useEffect can be used to tell the hook to run at least once without causing infinite loop
    console.log(tickets);

 
     //needs pagination
    return (
    <Container className='pageBodyContainer1'>
        <div className='buttonsContainer topButtons'>
            <h4 className='button' style={{borderRadius: '5px 5px 5px 0px'}}>Assigned</h4>
            <h4 className='button'>Written</h4>
        </div>
        <div className='list' style={{textAlign: 'left'}}>
            <div className='listItemContainer'>
                <div className='listItem' style={{color: '#efff0a'}}>
                    <span className='listColumnNames'>
                        Title
                    </span>
                    <span className='listColumnNames'>
                        Project
                    </span>
                    <span className='listColumnNames'>
                        Assigned
                    </span>
                    <span className='listColumnNames'>
                        Priority
                    </span>
                    <span className='listColumnNames'>
                        Status
                    </span>
                    <span className='listColumnNames'>
                        Created
                    </span>
                    <span className='listColumnNames'>
                        
                    </span>
                </div>
                
                    {tickets.map((ticket) =>
                    <TicketListItem 
                    key={ticket.ticket_id}
                    ticketID={ticket.ticket_id}
                    authorID={ticket.author_id}
                    relevantProjectID={ticket.relevant_project_id}
                    title={ticket.title}
                    descripton={ticket.description}
                    dateCreated={ticket.date_created}
                    dateLastUpdated={ticket.date_last_updated}
                    assignedUserID={ticket.assigned_user_id}
                    resolutionStatus={ticket.resolution_status}
                    priority={ticket.priority} />
                )}
            </div>
        </div>
    </Container>
        
    )
}
    

export default Tickets;
