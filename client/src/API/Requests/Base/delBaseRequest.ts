import baseRequest from "./baseRequest";

export default async function deleteBase(url: string, body: any) {
  return baseRequest(url, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
  }
  