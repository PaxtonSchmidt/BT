import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';

function Tickets() {
    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {
        fetch('/users/getUsers')
        .then((res => {
            if(res.ok) {
                return res.json();
            }
        }))
        .then(jsonRes => setTickets(jsonRes));
    }, []) //empty array passed as second argument to useEffect can be used to tell the hook to run at least once without causing infinite loop
    console.log(tickets);

 
     
    return (
        <Container>
            <div className='testScss'>
                {tickets.map((ticket) =>
                    <li key={ticket.ticket_id}>{ticket.name}</li>
                )}
            </div>
        </Container>
    )
}

    

export default Tickets;
