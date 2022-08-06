import getBase from "../Base/getBaseRequest";

export default function getTeammatesInfo(){
    return getBase('/teams/getTeammatesInformation')
}