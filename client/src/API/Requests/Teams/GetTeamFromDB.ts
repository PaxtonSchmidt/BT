import getBase from "../Base/getBaseRequest";

export default function getTeamsFromDB(){
    return getBase('/teams/getTeams')
}