import { Claims } from '../interfaces/claims';

export default async function postLogin(claims: Claims) {
    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claims)
    })
    console.log(response.status);
    // return response.json().then((response) => console.log(response));
}