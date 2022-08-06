import postBase from "../Base/postBaseRequest";

export default function postGetTicketNotes(data: any){
    return postBase('/tickets/getTicketNotes', data)
}