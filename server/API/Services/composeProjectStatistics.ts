interface StatusStats {
  Unassigned: number;
  Assigned: number;
  Investigating: number;
  Reviewing: number;
  Closed: number;
}
interface PriorityStats {
  Low: number;
  Medium: number;
  High: number;
}
interface Assignee {
  username: string;
  discriminator: number;
  amount: number;
}
interface ProjectStats {
  ticketStatusStats: StatusStats;
  ticketPriorityStats: PriorityStats;
  ticketAssigneeStats: Assignee[];
}
type AllProjectsStats = Omit<ProjectStats, 'ticketAssigneeStats'>;
interface Project {
  project_id: null | number;
  project_name: string;
  projectStats: ProjectStats;
}
interface ComposedStats {
  projects: Project[];
  allProjectsStats: AllProjectsStats;
}
export default function composeProjectStatistics(ticketList: any) {
  let ComposedStats: ComposedStats = {
    projects: [
      {
        project_id: null,
        project_name: '',
        projectStats: {
          ticketStatusStats: {
            Unassigned: 0,
            Assigned: 0,
            Investigating: 0,
            Reviewing: 0,
            Closed: 0,
          },
          ticketPriorityStats: {
            Low: 0,
            Medium: 0,
            High: 0,
          },
          ticketAssigneeStats: [],
        },
      },
    ],
    allProjectsStats: {
      ticketStatusStats: {
        Unassigned: 0,
        Assigned: 0,
        Investigating: 0,
        Reviewing: 0,
        Closed: 0,
      },
      ticketPriorityStats: {
        Low: 0,
        Medium: 0,
        High: 0,
      },
    },
  };

  for (let i = 0; i < ticketList.length; i++) {
    let ticket = ticketList[i];
    let projectIDX = ComposedStats.projects.findIndex((project: Project) => {
      if (project.project_id === ticket.project_id) {
        return true;
      }
    });
    if (projectIDX === -1) {
      let newProjectObject: Project = {
        project_id: ticket.project_id,
        project_name: ticket.project_name,
        projectStats: {
          ticketStatusStats: {
            Unassigned: 0,
            Assigned: 0,
            Investigating: 0,
            Reviewing: 0,
            Closed: 0,
          },
          ticketPriorityStats: { Low: 0, Medium: 0, High: 0 },
          ticketAssigneeStats: [],
        },
      };
      projectIDX = ComposedStats.projects.push(newProjectObject) - 1;
    }
    switch (ticket.resolution_status) {
      case 1:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketStatusStats.Unassigned += 1;
        ComposedStats.allProjectsStats.ticketStatusStats.Unassigned += 1;
        break;
      case 2:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketStatusStats.Assigned += 1;
        ComposedStats.allProjectsStats.ticketStatusStats.Assigned += 1;
        break;
      case 3:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketStatusStats.Investigating += 1;
        ComposedStats.allProjectsStats.ticketStatusStats.Investigating += 1;
        break;
      case 4:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketStatusStats.Reviewing += 1;
        ComposedStats.allProjectsStats.ticketStatusStats.Reviewing += 1;
        break;
      case 5:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketStatusStats.Closed += 1;
        ComposedStats.allProjectsStats.ticketStatusStats.Closed += 1;
        break;
      default:
        console.log('error in the data...');
    }

    switch (ticket.priority) {
      case 1:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketPriorityStats.High += 1;
        ComposedStats.allProjectsStats.ticketPriorityStats.High += 1;
        break;
      case 2:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketPriorityStats.Medium += 1;
        ComposedStats.allProjectsStats.ticketPriorityStats.Medium += 1;
        break;
      case 3:
        ComposedStats.projects[
          projectIDX
        ].projectStats.ticketPriorityStats.Low += 1;
        ComposedStats.allProjectsStats.ticketPriorityStats.Low += 1;
        break;
      default:
        console.log('there error in the data');
    }

    let index = ComposedStats.projects[
      projectIDX
    ].projectStats.ticketAssigneeStats.findIndex((assignee: Assignee) => {
      return assignee.username === ticket.assignee_username;
    });
    if (index === -1) {
      let user: any = {
        username: ticket.assignee_username,
        discriminator: ticket.assignee_user_discriminator,
        amount: 1,
      };
      ComposedStats.projects[projectIDX].projectStats.ticketAssigneeStats.push(
        user
      );
    } else {
      ComposedStats.projects[projectIDX].projectStats.ticketAssigneeStats[
        index
      ].amount += 1;
    }
  }
  ComposedStats.projects.shift();
  return ComposedStats;
}
