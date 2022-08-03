export interface focusedTicket {
  title: string;
  ticketID: number;
  description: string;
  authorUsername: string;
  authorDiscriminator: string;
  assigneeUsername: string;
  assigneeDiscriminator: string;
  relevantProjectID: number;
  relevantProjectName: string;
  dateCreated: Date;
  dateLastUpdated: Date;
  resolutionStatus: number;
  priority: number;
}
