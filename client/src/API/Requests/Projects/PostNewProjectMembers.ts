import { Teammate } from "../../interfaces/teammate";

export default async function postNewProjectMembers(data: Teammate[], project: string) {
    const response = await fetch('/projects/addListOfMembersToProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newMembers: data, projectName: project})
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    return response
}