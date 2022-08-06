import putBase from "../Base/putBaseRequest";

export default function updateMembetRole(member: any){
    return putBase('/projects/updateMemberRole', member)
}