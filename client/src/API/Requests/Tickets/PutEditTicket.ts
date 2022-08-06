import { Ticket } from '../../interfaces/ticket';
import putBase from '../Base/putBaseRequest';

export default async function putEditTicket(ticket: Ticket, ticket_id: number, project_id: number) {  
  let body = {
    target_ticket_id: ticket_id,
    project_id: project_id,
    priority: ticket.priority,
    assignee_username:
      ticket.assignee === undefined || ticket.assignee === ''
        ? ''
        : ticket.assignee.username,
    assignee_discriminator:
      ticket.assignee === undefined || ticket.assignee === ''
        ? null
        : ticket.assignee.discriminator,
    description: ticket.description,
    resolution_status: ticket.resolution_status,
  };

  return putBase('/tickets/putEditTicket', body)
}
