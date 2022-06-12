export interface ticket{
    title: string;
    ticket_id: number;
    description: string;
    author_username: string;
    author_discriminator: string;
    assignee_username: string;
    assignee_user_discriminator: string;
    project_id: number;
    project_name: string;
    date_created: Date;
    date_last_updated: Date;
    resolution_status: number;
    priority: number;
    setFocusedTicket: any;
}