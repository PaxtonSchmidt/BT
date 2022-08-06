import { Project } from '../../interfaces/project';
import postBase from '../Base/postBaseRequest';

export default async function postProject(data: Project) {
  return postBase('/projects/addProject', data)
}
