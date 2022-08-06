import putBase from "../Base/putBaseRequest";

interface TargetTeammate {
  username: string;
  discriminator: number;
}
interface newTeammateRole extends TargetTeammate {
  newRole: number;
}
export default async function putUpdateTeammateRole(data: TargetTeammate, newRole: number){
  let body: newTeammateRole = {
    username: data.username,
    discriminator: data.discriminator,
    newRole: newRole,
  };
  return putBase('/teams/putUpdateTeammateRole', body)
}
