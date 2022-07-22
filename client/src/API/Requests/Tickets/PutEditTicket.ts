import { Ticket } from "../../interfaces/ticket"

export default async function putEditTicket(ticket: Ticket, ticket_id: number) {
    console.log(ticket.assignee)
    console.log(ticket_id)
    let body = {
        target_ticket_id: ticket_id,
        priority: ticket.priority,
        assignee_username: ticket.assignee.username,
        assignee_discriminator: ticket.assignee.disciminator,
        description: ticket.description
    }
    const response = await fetch('/tickets/putEditTicket', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    console.log(response)
    return response.status
}