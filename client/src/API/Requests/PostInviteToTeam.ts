
export default async function postInviteToTeam(potentialTeammates: any) {
    const response = await fetch('/manageTeam/inviteUserToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(potentialTeammates)
    })
    console.log(response.status);
}