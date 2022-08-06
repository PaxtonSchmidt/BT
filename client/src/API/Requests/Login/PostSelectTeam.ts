import postBase from "../Base/postBaseRequest";

interface Team {
  team: string;
}

export default async function postSelectTeam(team: Team) {
  return postBase('/selectTeam/selectTeam', team)
}
