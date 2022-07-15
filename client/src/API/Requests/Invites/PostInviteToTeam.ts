
export default async function postInviteToTeam(potentialTeammates: any) {
    const response = await fetch('/teams/inviteUserToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(potentialTeammates)
    }).then(res => res.json())
    console.log(response)
    return response.status
}