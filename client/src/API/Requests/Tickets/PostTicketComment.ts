import postBase from "../Base/postBaseRequest";

export default async function postTicketComment(comment: string, ticket: any) {
  return postBase('/tickets/addTicketComment', {
    comment: comment,
    ticketID: ticket.ticket_id,
    projectID: ticket.project_id,
  })
}
