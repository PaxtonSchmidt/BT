export interface Ticket {
    title: string;
    description: string;
    project: string;
    assignee: any;
    priority: string;
    resolution_status: string;
    ticket_id?: string;
}