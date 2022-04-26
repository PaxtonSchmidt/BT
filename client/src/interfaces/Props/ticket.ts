export interface ticket{
    ticketID: number;
    authorID: number;
    relevantProjectID: number;
    title: string;
    descripton: string;
    dateCreated: Date;
    dateLastUpdated: Date;
    assignedUserID?: number;
    resolutionStatus: number;
    priority: number;
}