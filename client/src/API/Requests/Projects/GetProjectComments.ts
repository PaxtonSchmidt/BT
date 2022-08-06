import getBase from "../Base/getBaseRequest";

export default async function getProjectComments(){
    return getBase('/projects/getProjectComments')
}