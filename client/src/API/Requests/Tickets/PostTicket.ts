export default async function postTicket(data: any) {

    const response = await fetch('/tickets/addTicket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // return response.json().then((response) => console.log(response));
}