import { PotentialTeammates } from "../interfaces/potentialTeammates";

export default async function postInviteToTeam(potentialTeammates: any) {
    const response = await fetch('/manageTeam/addUserToTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(potentialTeammates)
    })
    console.log(response.status);
    // return response.json().then((response) => console.log(response));
}