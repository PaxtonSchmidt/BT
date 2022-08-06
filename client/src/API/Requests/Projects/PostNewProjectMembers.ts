import { Teammate } from '../../interfaces/teammate';
import postBase from '../Base/postBaseRequest';

export default async function postNewProjectMembers(data: Teammate[], project: string) {
  return postBase('/projects/addListOfMembersToProject'
  , { newMembers: data, projectName: project })
}
