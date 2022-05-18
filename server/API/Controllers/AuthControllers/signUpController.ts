import { connectionPool } from "../../dbConnectionPool";
import { consumeRowDataPacket } from "../../Services/consumeRowDataPacket";
let userController = require('../userController')

function signUp(req: any, res: any) {
    
    function ifEmailDoesntExistAddUserToDB(req: any, res: any) {
        console.log(req.body)
        let targetEmail = req.body.email;
        let sql = "SELECT EXISTS(SELECT * FROM users WHERE email = ?)"; 
        
        connectionPool.query(sql, targetEmail, (err: any, result: any) => {
            let isTaken = consumeRowDataPacket(result);
            console.log(isTaken)
            if(err) throw err;
            
            try{
                if(!isTaken){
                    userController.addUser(req, res)
                } else{
                    res.sendStatus(400);
                }
            } catch{ 
                res.sendStatus(500)
            }
        })
    }

    ifEmailDoesntExistAddUserToDB(req, res);
}



module.exports = { signUp }



// console.log(isTargetEmailTaken);
// try{
//     if(isTargetEmailTaken === true) {                
//         res.send('Email taken')                
//     } else {
//         res.status(401).send();
//     }
// } catch {
//     res.status(500).send();
// }