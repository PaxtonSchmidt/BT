export default async function deleteInvite(invite_id: string) {
    const response = await fetch('/teams/deleteInviteToTeam', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inviteID: invite_id})
    });

    console.log(response.status)
    
    return response.status
}