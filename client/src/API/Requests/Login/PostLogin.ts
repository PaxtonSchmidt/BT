import { Claims } from '../../interfaces/claims';

export default async function postLogin(claims: Claims) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claims)
    })
    return response.status;
    // return response.json().then((response) => console.log(response));
}