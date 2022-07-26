export interface StatusStats {
    Unassigned: number,
    Assigned: number,
    Investigating: number,
    Reviewing: number,
    Closed: number
}
export interface PriorityStats{
    Low: number,
    Medium: number, 
    High: number
}
export interface Assignee {
    username: string,
    discriminator: number,
    amount: number
}
export interface ProjectStats{
    ticketStatusStats: StatusStats,
    ticketPriorityStats: PriorityStats,
    ticketAssigneeStats: Assignee[]
}
type AllProjectsStats = Omit<ProjectStats, 'ticketAssigneeStats'>
export interface Project {
    project_id: null | number,
    project_name: string,
    projectStats: ProjectStats
}
export default interface ComposedStats {
    projects: Project[],
    allProjectsStats: AllProjectsStats
}