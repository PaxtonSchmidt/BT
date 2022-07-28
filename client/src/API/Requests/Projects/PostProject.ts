import { Project } from "../../interfaces/project";

export default async function postProject(data: Project) {
    const response = await fetch('/projects/addProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    return response
}