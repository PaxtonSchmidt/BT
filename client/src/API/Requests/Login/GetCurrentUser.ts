export default async function getCurrentUser() {
  const response = await fetch('/currentUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  let currentUser = response[0];

  return currentUser;
}
