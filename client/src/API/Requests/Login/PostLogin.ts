import { Claims } from '../../interfaces/claims';

export default async function postLogin(claims: Claims) {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(claims)
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
    return response;
}