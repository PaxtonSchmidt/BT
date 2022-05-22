import { Navigate } from "react-router-dom";
import { NewUser } from "../interfaces/NewUser";

export default async function postSignUp(data: NewUser) {
    const response = await fetch('/signup/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.body);
    
    return response.status;
    // return response.json().then((response) => console.log(response));
}