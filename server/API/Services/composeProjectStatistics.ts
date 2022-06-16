export default function composeProjectStatistics(ticketList: any){
    let projectsStats: any = {
        ticketStatusStats: {
            Unassigned: 0,
            Open: 0,
            SolutionProposed: 0,
            SolutionRejected: 0,
            Closed: 0
        },
        ticketPriorityStats: {
            Low: 0,
            Medium: 0,
            High: 0
        },
        ticketAssigneeStats: [] 
    }

    for(let i = 0; i < ticketList.length; i++){
        let ticket = ticketList[i]

        switch (ticket.resolution_status){
            case 1:
                projectsStats.ticketStatusStats.Unassigned += 1
                break;
            case 2: 
                projectsStats.ticketStatusStats.Open += 1
                break;
            case 3: 
                projectsStats.ticketStatusStats.SolutionProposed += 1
                break;
            case 4: 
                projectsStats.ticketStatusStats.SolutionRejected += 1
                break;
            case 5:
                    projectsStats.ticketStatusStats.Closed += 1
            default:
                console.log('error in the data')
        }
                    
        switch (ticket.priority){
            case 1:
                projectsStats.ticketPriorityStats.High += 1
                break;
            case 2: 
                projectsStats.ticketPriorityStats.Medium += 1
                break;
            case 3: 
                projectsStats.ticketPriorityStats.Low += 1
                break;
            default:
                console.log('error in the data')
        }


        let index = projectsStats.ticketAssigneeStats.findIndex((object: any) => {
            return object.username === ticket.assignee_username;
        })
        if(index === -1){
            let user: any = {
                username: ticket.assignee_username, 
                discriminator: ticket.assignee_user_discriminator,
                amount: 1
            }
            projectsStats.ticketAssigneeStats.push(user)
        } else {
            projectsStats.ticketAssigneeStats[index].amount += 1
        }

    };
    return projectsStats  
}
