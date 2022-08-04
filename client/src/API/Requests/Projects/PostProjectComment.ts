import { Project } from '../../interfaces/project';

export default async function postProjectComment(data: string, project: string) {
  const response = await fetch('/projects/addProjectComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment: data, project_name: project}),
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  return response;
}
