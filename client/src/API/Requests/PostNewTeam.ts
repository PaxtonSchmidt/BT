export default async function postNewTeam(data: string) {
    const response = await fetch('/teams/addTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.status
}