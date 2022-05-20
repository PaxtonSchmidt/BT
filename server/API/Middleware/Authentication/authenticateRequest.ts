import authenticateJWT from "../../Services/authenticateJWT";

export default function authenticateRequest(req: any, res: any, next: any) {
    if(authenticateJWT(req.headers.cookie) === true){
        console.log('jwt all clear')
        next()
    } else{
        console.log('titties')
        res.sendStatus(401);
    }
}