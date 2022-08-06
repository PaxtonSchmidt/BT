import getBase from "../Base/getBaseRequest";

export default function getMemberDetails(){
    return getBase('/projects/getRelatedMemberDetails')
}