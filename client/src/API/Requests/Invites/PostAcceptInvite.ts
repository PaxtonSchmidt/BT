export default async function postAcceptInvite(invite_id: string) {
    const response = await fetch('/teams/acceptInvite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inviteID: invite_id})
    })

    console.log(await response.json())
    return response.status
}
