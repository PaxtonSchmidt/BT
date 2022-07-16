interface TargetTeammate{
    username: string,
    discriminator: number
}
interface newTeammateRole extends TargetTeammate{
    newRole: number
}
export default async function putUpdateTeammateRole(data: TargetTeammate, newRole: number) {
    let body: newTeammateRole = {
        username: data.username,
        discriminator: data.discriminator,
        newRole: newRole
    }
    const response = await fetch('/teams/putUpdateTeammateRole', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    console.log(response)
    return response.status
}