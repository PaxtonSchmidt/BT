interface Error{
    status: number,
    message: string
}
export interface CustomResponse {
    isOk: boolean,
    error: Error,
    body: any
}
//Return a response object so the component can check for okResponse and execute conditional logic accordingly
//Return the default error messages for network issues
//Return custom defined error messages for server issues
export default async function baseRequest(url: string, init: RequestInit): Promise<CustomResponse>{
    let response: CustomResponse = await fetch(url, init)
        .then(async (r) =>{
            const isJson = r.headers.get('content-type')?.includes('application/json');
            const data: any = isJson ? await r.json() : null
            return !r.ok 
            ? Promise.reject({
                isOk: false, 
                error: {
                    status: r.status, 
                    message: r.bodyUsed ? data.message : r.statusText
                }
            })
            :{
                isOk: true, 
                error: {status: r.status, message: 'ok'},
                body: await data 
            }  
        })
        .catch(async (e: any) => {
            if(e.isOk !== undefined){
                return {
                    isOk: false,
                    error: await e.error,
                    body: null
                }
            } else {
                return {
                    isOk: false,
                    error: {
                        status: 500,
                        message: 'Something went wrong...'
                    },
                    body: null
                }
            }
        })
        
    return response
}
