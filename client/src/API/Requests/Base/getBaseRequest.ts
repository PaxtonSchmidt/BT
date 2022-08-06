import baseRequest from "./baseRequest"

export default async function getBase(url: string){
    return baseRequest(url, 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        })
}