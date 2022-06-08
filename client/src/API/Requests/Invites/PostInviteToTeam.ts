
export default async function postInviteToTeam(potentialTeammates: any) {
    const response = await fetch('/teams/inviteUserToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(potentialTeammates)
    })
    return response.status
}