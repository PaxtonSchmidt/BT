import authenticateJWT from "../Services/authenticateJWT";

export default function authenticateRequest(req: any, res: any, next: any) {
    if(authenticateJWT(req.headers.cookie) === true){
        console.log('ayo')
        next()
    } else{
        res.sendStatus(401);
    }
}