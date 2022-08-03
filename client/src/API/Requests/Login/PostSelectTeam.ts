interface Team {
  team: string;
}

export default async function postSelectTeam(team: Team) {
  const response = await fetch('/selectTeam/selectTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  });
  return response.json();
  // return response.json().then((response) => console.log(response));
}
