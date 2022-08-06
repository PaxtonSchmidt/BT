import getBase from "../Base/getBaseRequest";

export default function getUsersOnTeam(){
    return getBase('/projects/getUsersOnTeam')
}