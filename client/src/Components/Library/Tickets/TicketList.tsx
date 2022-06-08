import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import TicketListItem from './TicketListItem';

function Tickets() {
    let dispatch = useDispatch();
    const { updateFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {
        console.log('a')
        async function getTickets(){
            let response: any = fetch('/tickets/getTickets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())             
            setTickets(await response)
            return await response
        }
        console.log(getTickets())
    }, [])//empty array passed as second argument to useEffect can be used to tell the hook to run at least once without causing infinite loop

    console.log(` here ${tickets}`)
 
    if(tickets === undefined){
        return<></>
    }else{
        //needs pagination
        return (
        <Container className='pageBodyContainer1 ticketList fadeIn'>
            <div className='buttonsContainer topButtons'>
                <h4 className='button topButton' >Assigned</h4>
                <h4 className='button topButton'>Written</h4>
            </div>
            <div className='list componentGlow' style={{textAlign: 'left'}}>
                    {tickets!.map((ticket) =>
                    <TicketListItem 
                    key={ticket.ticket_id}
                    title={ticket.title}
                    ticketID= {ticket.ticket_id}
                    description= {ticket.description}
                    authorUsername= {ticket.author_username}
                    authorDiscriminator= {ticket.author_discriminator}
                    assigneeUsername= {ticket.assignee_username}
                    assigneeDiscriminator= {ticket.assignee_user_discriminator}
                    relevantProjectID= {ticket.relevant_project_id}
                    relevantProjectName= {ticket.project_name}
                    dateCreated= {ticket.date_created}
                    dateLastUpdated= {ticket.date_last_updated}
                    resolutionStatus= {ticket.resolution_status}
                    priority= {ticket.priority}
                    setFocusedTicket={updateFocusedTicket}
                    />
                )}
            </div>
        </Container>
            
        )
    }
}
    

export default Tickets;
