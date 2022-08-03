import { Teammate } from '../Interfaces/teammate';
interface InfoItem {
  username: string;
  discriminator: number;
  role_id: number;
  date_joined: string;
  enlisted_by_username: string;
  enlisted_by_discriminator: number;
}
interface UserProject {
  username: string;
  discriminator: number;
  name: string;
  role_id: number;
}

interface AssignedProjects {
  project_name: string;
  role_id: number;
}
export interface TeammatesInformation extends Teammate {
  username: string;
  discriminator: number;
  team_role: number;
  date_joined: string;
  enlisted_by_username: string;
  enlisted_by_discriminator: number;
  projects: AssignedProjects[];
}
export default function composeTeammateInfo(
  info: InfoItem[],
  user_projects: UserProject[]
) {
  let teammatesInfo: TeammatesInformation[] = [];

  for (let i = 0; i < info.length; i++) {
    let teammate: TeammatesInformation = {
      username: info[i].username,
      discriminator: info[i].discriminator,
      team_role: info[i].role_id,
      date_joined: info[i].date_joined,
      enlisted_by_username: info[i].enlisted_by_username,
      enlisted_by_discriminator: info[i].enlisted_by_discriminator,
      projects: [],
    };
    teammatesInfo.push(teammate);
  }
  for (let i = 0; i < user_projects.length; i++) {
    let teammateIDX: number = teammatesInfo.findIndex(
      (teammate: TeammatesInformation) => {
        if (
          teammate.username === user_projects[i].username &&
          teammate.discriminator === user_projects[i].discriminator
        ) {
          return true;
        }
      }
    );
    teammatesInfo[teammateIDX].projects.push({
      project_name: user_projects[i].name,
      role_id: user_projects[i].role_id,
    });
  }

  return teammatesInfo;
}
