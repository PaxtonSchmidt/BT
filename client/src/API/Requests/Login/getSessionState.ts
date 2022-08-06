import getBase from "../Base/getBaseRequest"

export default function getSessionState() {
    return getBase('/users/getSessionState')
}