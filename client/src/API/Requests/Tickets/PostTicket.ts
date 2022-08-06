import postBase from "../Base/postBaseRequest";

export default async function postTicket(data: any) {
  return postBase('/tickets/addTicket', data)
}
