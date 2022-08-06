import getBase from "../Base/getBaseRequest";

export default function getTickets(){
    return getBase('/tickets/getTickets')
}