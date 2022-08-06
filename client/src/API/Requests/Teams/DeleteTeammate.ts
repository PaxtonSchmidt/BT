import deleteBase from "../Base/delBaseRequest";

export default function deleteTeammate(teammate: any){
    return deleteBase('/teams/removeTeammate', teammate)
}
