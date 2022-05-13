export default async function getCurrentUser() {
    const response = await fetch('/loginUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => {return data[0].username});

    let currentUser = response;

    console.log(currentUser)
    return currentUser
}