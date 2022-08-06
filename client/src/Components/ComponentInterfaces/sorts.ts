import { ticket } from './ticket';

export interface SortTypes {
  project: string;
  status: string;
  priority: string;
  title: string;
}

export const sorts: SortTypes = {
  project: 'project',
  status: 'status',
  priority: 'priority',
  title: 'title',
};

export interface SortActions {
  sortByProject: (tickets: ticket[]) => ticket[];
  sortByStatus: (tickets: ticket[]) => ticket[];
  sortByPriority: (tickets: ticket[]) => ticket[];
  sortByTitle: (tickets: ticket[]) => ticket[];
}

export const sortAction: SortActions = {
  sortByProject: (tickets: ticket[]) => {
    tickets.sort(projectCompare);
    return tickets;
  },
  sortByStatus: (tickets: ticket[]) => {
    tickets.sort(statusCompare);
    return tickets;
  },
  sortByPriority: (tickets: ticket[]) => {
    tickets.sort(priorityCompare);
    return tickets;
  },
  sortByTitle: (tickets: ticket[]) => {
    tickets.sort(titleCompare);
    return tickets;
  },
};

function projectCompare(i: ticket, j: ticket) {
  let iName = i.project_name.toLowerCase();
  let jName = j.project_name.toLowerCase();
  return iName < jName ? -1 : j.project_name < i.project_name ? 1 : 0;
}
function priorityCompare(i: ticket, j: ticket) {
  return i.priority < j.priority ? -1 : j.priority < i.priority ? 1 : 0;
}
function statusCompare(i: ticket, j: ticket) {
  return i.resolution_status < j.resolution_status
    ? -1
    : j.resolution_status < i.resolution_status
      ? 1
      : 0;
}
function titleCompare(i: ticket, j: ticket) {
  let iTitle = i.title.toLowerCase();
  let jTitle = j.title.toLowerCase();
  return iTitle < jTitle ? -1 : j.title < i.title ? 1 : 0;
}
