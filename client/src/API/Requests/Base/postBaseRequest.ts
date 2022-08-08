import baseRequest from "./baseRequest";

export default async function postBase(url: string, body: any = {body: null}) {
    return baseRequest(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
  }
  