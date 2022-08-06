import postBase from "../Base/postBaseRequest";

export default async function postAcceptInvite(invite_id: string) {
  let body = { inviteID: invite_id }
  return postBase('/teams/acceptInvite', body)
}
