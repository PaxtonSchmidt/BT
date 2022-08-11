export interface Ticket {
  title: string;
  description: string | number
  project: string | number
  assignee: any;
  priority: string;
  resolution_status: string;
  ticket_id?: string | number
}
