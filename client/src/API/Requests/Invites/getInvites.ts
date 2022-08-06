import getBase from "../Base/getBaseRequest";

export default async function getInvites() {
    return getBase('/currentUser')
  }
  