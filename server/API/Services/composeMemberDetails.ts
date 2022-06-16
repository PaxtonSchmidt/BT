export default function composeMemberDetails(membersList: any){
    let memberDetails = [{
        username: '',
        discriminator: 0,
        memberProjects: [
            {project_id: 0,
                project_name: '',
                project_role: 0,
                date_assigned: '',
                assignedByUsername: '',
                assignedByDiscriminator: 0
            }
        ]
    }]

    membersList.forEach((member: any) => {
        let index = memberDetails.findIndex((detail: any) => {
            if(member.username === detail.username && member.discriminator === detail.discriminator){
                return true
            } else {
                return false
            }
        })    

        //if the user isnt already in the details list, push the whole object to the list
        //otherwise push only the project to that users projects array
        if(index === -1){
            memberDetails.push({
                username: member.username,
                discriminator: member.discriminator,
                memberProjects: [
                    {
                    project_id: member.project_id,
                    project_name: member.project_name,
                    project_role: member.role_id,
                    date_assigned: member.dateAssigned,
                    assignedByUsername: member.assignedByUsername,
                    assignedByDiscriminator: member.assignedByUserDiscriminator     
                    }
                ]
            })
        } else {
            memberDetails[index].memberProjects.push(
                {
                project_id: member.project_id,
                project_name: member.project_name,
                project_role: member.role_id,
                date_assigned: member.dateAssigned,
                assignedByUsername: member.assignedByUsername,
                assignedByDiscriminator: member.assignedByUserDiscriminator  
                }
            )
        }
    })
    memberDetails.shift()
    return memberDetails
}