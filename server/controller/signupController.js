const Users = require('../model/Users')

module.exports = {
    createNewUser : (req, res)=>{
        const {username, password} = req.body
        const userModel = new Users()

        userModel.createNewUser(username, password)
        .then(() => {
            res.status(200).json({success:true, msg: "New user has been created"})
        })
        .catch((err)=>{
            if(err.errno == 1062){
                res.status(409).json({success:false, msg: "Someone already has that username"})
            } else {
                res.status(500).json({success:false, msg: "Server error"})
            }
        })

    }
}