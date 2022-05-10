export default async function getCurrentUser() {
    const response = await fetch('/loginUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => console.log(res.json()))
    
    // return response.json().then((response) => console.log(response));
}