import { connectionPool } from "../../dbConnectionPool";
import { consumeRowDataPacket } from "../../Services/consumeRowDataPacket";
let userController = require('../userController')

async function signUp(req: any, res: any) {
    let targetEmail = req.body.email;

    function isEmailTaken(email: string) {
        return new Promise<any>((resolve, reject) => {
            let sqlEmail = "SELECT EXISTS(SELECT * FROM users WHERE email = ?)"; 
            connectionPool.query(sqlEmail, email, (err: any, result: any) => {
                let isEmailTaken = consumeRowDataPacket(result);
                console.log(isEmailTaken)
                return err ? reject(err) : resolve(isEmailTaken);
            });
        })
    }

    function isUsernameAndDiscComboTaken(username: string, discriminator: number) {
        return new Promise<any>((resolve, reject) => {
            let variables = [username, discriminator]
            let sqlUsernameDiscriminator = "SELECT EXISTS(SELECT * FROM users WHERE username= ? AND discriminator= ?)"
            connectionPool.query(sqlUsernameDiscriminator, variables, (err: any, result: any) => {
                let res = consumeRowDataPacket(result)
                console.log(res)
                return err ? reject(err) : resolve(res);
            });
        })
    }

    if(await isUsernameAndDiscComboTaken(req.body.username, req.body.tag) === false 
        && await isEmailTaken(targetEmail) === false){
        userController.addUser(req, res)
    }
    


    // userController.addUser(req, res, discriminator)
}


            // try{
            //     if(!isEmailTaken){
            //         console.log('got here32131')
            //         console.log(discriminator)
                                        
            //     } else{
            //         res.sendStatus(400);
            //     }
            // } catch{ 
            //     res.sendStatus(500)
            // }






module.exports = { signUp }

