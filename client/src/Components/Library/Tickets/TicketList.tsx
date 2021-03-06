import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import TicketListItem from './TicketListItem';
let deepClone = require('lodash.clonedeep')

function Tickets() {
    let dispatch = useDispatch();
    const { updateFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const ticketsState = useSelector((state: State) => state.tickets)
    const [tickets, setTickets] = useState<any[]>([]);
    
    useEffect(() => {
        if(ticketsState){
            if(ticketsState.length > 0){setTickets(deepClone(ticketsState).reverse())}
        }
    }, [ticketsState])

    if(tickets.length === 0){
        return(
        <Container className='pageBodyContainer1 fadeIn'>
            <div className='listContainer'>
                <div className='listRow'>
                    <div className='listRowSection leftSection'>
                        <span className='rowItem' style={{paddingLeft: '30px'}}>
                            Title
                        </span>
                    </div>
                    <div className='listRowSection rightSection'>
                        <span className='rowItem'>
                            Project
                        </span> 
                        <span className='rowItem'>
                            Status
                        </span>
                        <span className='rowItem'>
                            Priority
                        </span>
                    </div>
                </div>
                <div className='list componentGlow delayedFadeIn' style={{textAlign: 'center', color: 'white'}}>
                    <p style={{paddingTop: '10px'}}>No tickets</p>
                </div>
            </div>
        </Container>
        )
    }else{
        //needs pagination
        return (
        <Container className='pageBodyContainer1 fadeIn'>
            <div className='listContainer'>
                <div className='listRow'>
                    <div className='listRowSection leftSection'>
                        <span className='rowItem' style={{paddingLeft: '30px'}}>
                            Title
                        </span>
                    </div>
                    <div className='listRowSection rightSection'>
                        <span className='rowItem'>
                            Project
                        </span> 
                        <span className='rowItem'>
                            Status
                        </span>
                        <span className='rowItem'>
                            Priority
                        </span>
                    </div>
                </div>



                <div className='list componentGlow' style={{textAlign: 'left'}}>
                    {tickets!.map((ticket) =>
                        <TicketListItem 
                        key={ticket.ticket_id}
                        title={ticket.title}
                        ticket_id= {ticket.ticket_id}
                        description= {ticket.description}
                        author_username= {ticket.author_username}
                        author_discriminator= {ticket.author_discriminator}
                        assignee_username= {ticket.assignee_username}
                        assignee_user_discriminator= {ticket.assignee_user_discriminator}
                        project_id= {ticket.project_id}
                        project_name= {ticket.project_name}
                        date_created= {ticket.date_created}
                        date_last_updated= {ticket.date_last_updated}
                        resolution_status= {ticket.resolution_status}
                        priority= {ticket.priority}
                        setFocusedTicket={updateFocusedTicket}
                        focusedTicketID={focusedTicketState.ticket_id}
                        />
                        )}
                </div>
            </div>
        </Container>
            
        )
    }
}
    

export default Tickets;
