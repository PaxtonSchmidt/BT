import postBase from "../Base/postBaseRequest";

export default async function postNewTeam(data: string) {
  return postBase('/teams/addTeam', data)
}
