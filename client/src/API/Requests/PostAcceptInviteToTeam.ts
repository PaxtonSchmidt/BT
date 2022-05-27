export default async function postAcceptInviteToTeam(data: any) {
    const response = await fetch('/teams/acceptInviteToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.status);
}