export default async function postTicketComment(comment: string, ticket: any) {
  const response = await fetch('/tickets/addTicketComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: comment,
      ticketID: ticket.ticket_id,
      projectID: ticket.project_id,
    }),
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));

  return response;
}
