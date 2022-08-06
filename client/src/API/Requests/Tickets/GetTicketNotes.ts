import getBase from "../Base/getBaseRequest";

export default async function getTicketNotes() {
    return getBase('/tickets/getTicketNotes')
  }