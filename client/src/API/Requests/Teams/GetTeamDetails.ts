import getBase from "../Base/getBaseRequest";

export default function getTeamDetails(){
    return getBase('/teams/getTeamDetails')
}