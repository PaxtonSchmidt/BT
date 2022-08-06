import putBase from "../Base/putBaseRequest";

export default function removeMember(member: any){
    return putBase('/projects/removeMember', member)
}