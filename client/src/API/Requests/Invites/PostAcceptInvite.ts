export default async function postAcceptInvite(team_id: any) {
    const response = await fetch('/teams/acceptInviteToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({teamID: team_id})
    })
    return response.status
}
