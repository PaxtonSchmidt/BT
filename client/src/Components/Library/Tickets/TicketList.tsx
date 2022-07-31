import e from 'express';
import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import { ticket } from '../../ComponentInterfaces/ticket';
import TicketListItem from './TicketListItem';
let deepClone = require('lodash.clonedeep')

function Tickets() {
    let dispatch = useDispatch();
    const { updateFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const ticketsState = useSelector((state: State) => state.tickets)
    const [tickets, setTickets] = useState<any[]>([]);
    const [sortedBy, setSortedBy] = useState<string>('');
    const [isClosedFiltered, setIsClosedFiltered] = useState<boolean>(false)
    console.log(ticketsState)
    useEffect(() => {
        if(ticketsState !== undefined){
            let newTicketArray = ticketsState
            if(ticketsState.length > 0){setTickets(newTicketArray)}
        }
    }, [ticketsState])

    function sortTickets(){
        let newState = [...tickets]
        console.log(newState)
        newState.splice(9, 10)
        console.log(newState)
        
        setTickets(newState)
    }

    function filterClosedTickets(){
        let state = [...tickets]
        let newTickets = state.filter((ticket: ticket)=> ticket.resolution_status !== 5)
        setTickets(newTickets)
    }

    useEffect(()=>{
        // sortTickets()
        if(isClosedFiltered === true){
            filterClosedTickets()
        } else { //reset to the tickets in ticketsStore
            let newTicketArray = ticketsState
            setTickets(newTicketArray)
        }
    }, [sortedBy, isClosedFiltered])


    if(tickets.length === 0){
        return(
        <Container className='pageBodyContainer1 fadeIn'>
            <div className='listContainer' >
                <div className='listRow'>
                    <div className='listRowSection leftSection'> 
                        <span className='rowItem' style={{paddingLeft: '30px'}} >
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
                        <span className='rowItem' style={{paddingLeft: '30px'}} onClick={()=>setIsClosedFiltered(!isClosedFiltered)}>
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
                    {tickets?.map((ticket) =>
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
