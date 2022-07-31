export default async function deleteInvite(invite_id: string) {
    const response = await fetch('/teams/deleteInvite', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inviteID: invite_id})
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))

    
    return response
}