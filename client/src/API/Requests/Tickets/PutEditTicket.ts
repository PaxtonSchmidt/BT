import { Ticket } from "../../interfaces/ticket"

export default async function putEditTicket(ticket: Ticket, ticket_id: number) {
    console.log(ticket)
    let body = {
        target_ticket_id: ticket_id,
        priority: ticket.priority,
        assignee_username: ticket.assignee.username,
        assignee_discriminator: ticket.assignee.discriminator,
        description: ticket.description,
        resolution_status: ticket.resolution_status
    }
    const response = await fetch('/tickets/putEditTicket', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    return response
}