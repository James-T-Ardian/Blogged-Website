import { Request, RequestHandler, Response } from "express";

// File contains request handlers for routes/signOutRoute
// For information about express request handlers: https://www.etutorialspoint.com/index.php/expressjs/express-js-requesthandler

const logOutUser:RequestHandler = (req:Request, res:Response)=>{
    if(req.session.user){
        // Destroy cookie
        req.session.destroy((err:any)=>{
            return res.status(500).json({loggedOut: false, msg: "Server error"})
        });
        res.clearCookie("username")
    
        return res.status(200).json({loggedOut: true, msg: "User has been logged out"})
    } else {
        return res.status(409).json({loggedOut: false, msg: "Cannot log out if user hasnt logged in"})
    }
    
}

export{
    logOutUser
}