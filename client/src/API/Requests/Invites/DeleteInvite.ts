import deleteBase from "../Base/delBaseRequest";

export default async function deleteInvite(invite_id: string) {
  let body = { inviteID: invite_id }
  return deleteBase('/teams/deleteInvite', body)
}
