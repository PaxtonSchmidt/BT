export interface TicketNote{
    comment_id: number,
    author_username: string,
    author_discriminator: number,
    body: string,
    relevant_ticket_id: number,
    date_created: string
}