import { Project } from "../../interfaces/project";

export default async function postProject(data: Project) {
    const response = await fetch('/projects/addProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.status);
    // return response.json().then((response) => console.log(response));
}