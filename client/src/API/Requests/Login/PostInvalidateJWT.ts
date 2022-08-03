export default async function postInvalidateJWT() {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}
