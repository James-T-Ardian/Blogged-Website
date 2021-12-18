const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    createNewUser : (req, res)=>{
        const {username, password} = req.body
        const userModel = new Users()

        bcrypt.hash(password, saltRounds, (error, hash)=>{
            if(error){
                return res.status(500).json({signedUp: false, msg: "Server error"})
            }
            
            userModel.createNewUser(username, hash)
            .then(() => {
                return res.status(200).json({signedUp: true, msg: "Account has been created"})
            })
            .catch((err)=>{
                if(err.errno == 1062){
                    return res.status(409).json({signedUp: false, msg: "Someone already has that username"})
                } else {
                    return res.status(500).json({signedUp: false, msg: "Server error"})
                }
            })
        })
        

    }
}