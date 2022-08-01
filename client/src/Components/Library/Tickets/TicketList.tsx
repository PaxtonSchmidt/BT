import e from 'express';
import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FocusedTicketActionCreators } from '../../../Redux';
import { State } from '../../../Redux/reducers';
import { sorts, sortAction, SortTypes } from '../../ComponentInterfaces/sorts';
import { ticket } from '../../ComponentInterfaces/ticket';
import TicketListItem from './TicketListItem';

function Tickets() {
    let dispatch = useDispatch();
    const { updateFocusedTicket } = bindActionCreators(FocusedTicketActionCreators, dispatch)
    const focusedTicketState = useSelector((state: State) => state.focusedTicket)
    const ticketsState = useSelector((state: State) => state.tickets)
    const [tickets, setTickets] = useState<any[]>([]);
    const [isClosedFiltered, setIsClosedFiltered] = useState<boolean>(true)
    
    const [sortedBy, setSortedBy] = useState<string>(sorts.status);
    
    useEffect(() => {
        if(ticketsState !== undefined){
            let newTicketArray = ticketsState
            if(ticketsState.length > 0){
                setTickets(newTicketArray)
                applyTicketSorts()
            }
        }
    }, [ticketsState])

    function applyTicketSorts(){
        let newTickets: ticket[] = [...ticketsState]
        //filter out closed tickets depending on toggle
        if(isClosedFiltered){
            newTickets = newTickets.filter((ticket: ticket)=> ticket.resolution_status !== 5)
        }

        //apply selected sort type
        switch(sortedBy){
            case sorts.project:
                newTickets = sortAction.sortByProject(newTickets)
                return setTickets(newTickets);
            case sorts.status:
                newTickets = sortAction.sortByStatus(newTickets)
                return setTickets(newTickets)
            case sorts.priority:   
                newTickets = sortAction.sortByPriority(newTickets)
                return setTickets(newTickets)
            case sorts.title:   
                newTickets = sortAction.sortByTitle(newTickets)
                return setTickets(newTickets)
            default: 
                return setTickets(newTickets); 
        }
    }
    useEffect(()=>{applyTicketSorts()}, [sortedBy, isClosedFiltered])

    function handleSetSortedBy(sortType: string){
        if(sortedBy === sortType){
            let newTickets = [...tickets].reverse()
            setTickets(newTickets)
        }
        setSortedBy(sortType)
    }

    //needs pagination
    return (
    <Container className='pageBodyContainer1 fadeIn'>
        <div className='listContainer'>
            <div className='listRow'>
                <div className='listRowSection leftSection'>
                    <span className='rowItem' style={{paddingLeft: '30px'}} onClick={()=>handleSetSortedBy(sorts.title)}>
                        Title
                    </span>
                </div>
                <div className='listRowSection rightSection'>
                    <span className='rowItem' onClick={()=>handleSetSortedBy(sorts.project)}>
                        Project
                    </span> 
                    <span className='rowItem' onClick={()=>handleSetSortedBy(sorts.status)}>
                        Status
                    </span>
                    <span className='rowItem' onClick={()=>handleSetSortedBy(sorts.priority)}>
                        Priority
                    </span>
                </div>
            </div>


            {tickets.length === 0 ? 
            <div className='list componentGlow delayedFadeIn' style={{textAlign: 'center', color: 'white'}}>
                <p style={{paddingTop: '10px'}}>No tickets</p>
            </div>
            :
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
            </div>}
        </div>
    </Container>
        
    )
}

    

export default Tickets;
