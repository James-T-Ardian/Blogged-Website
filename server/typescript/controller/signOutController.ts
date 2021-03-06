import { Request, RequestHandler, Response } from "express";

// File contains request handlers for routes/signOutRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler

const logOutUser:RequestHandler = (req:Request, res:Response): Response<any, Record<string, any>> | undefined=>{
    if(req.session.user){
        // Destroy cookie
        req.session.destroy((err:any)=>{
            // No need to handle
        });
        res.clearCookie("connect.sid")
    
        return res.status(200).json({loggedOut: true, msg: "User has been logged out"})
    } else {
        return res.status(409).json({loggedOut: false, msg: "Cannot log out if user hasnt logged in"})
    }
    
}

export{
    logOutUser
}