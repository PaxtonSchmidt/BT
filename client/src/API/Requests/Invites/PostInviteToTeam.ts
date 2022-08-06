import postBase from "../Base/postBaseRequest";

export default async function postInviteToTeam(potentialTeammates: any) {
  return postBase('/teams/inviteUserToTeam', potentialTeammates)
}
