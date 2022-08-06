import baseRequest from "./baseRequest";

export default async function putBase(url: string, body: any){
    return baseRequest(url, 
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
}

