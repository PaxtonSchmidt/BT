export default async function postTicket(data: any) {
  console.log(data);
  const response = await fetch('/tickets/addTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((r) => r.json().then((data) => ({ status: r.status, body: data })));
  return response;
}
