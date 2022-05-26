import authenticateJWT from "../Services/authenticateJWT";

export default function authenticateRequest(req: any, res: any, next: any) {
    if(authenticateJWT(req.headers.cookie) === true){
        next()
    } else{
        console.log('bad request')
        res.sendStatus(400);
    }
}