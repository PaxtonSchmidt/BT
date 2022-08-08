import getBase from "../Base/getBaseRequest";

export default function getProjectStats(){
    return getBase('/projects/getProjectsStatistics')
}