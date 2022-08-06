import { Project } from '../../interfaces/project';
import postBase from '../Base/postBaseRequest';

export default async function postProjectComment(data: string, project: string) {
  return postBase('/projects/addProjectComment', {comment: data, project_name: project})
}
