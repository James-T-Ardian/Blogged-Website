const Users = require('../model/Users')

module.exports = {
  loginUser : (req, res) => {
    const {username, password} = req.body
    const userModel = new Users()

    userModel.getPassword(username)
    .then((result)=>{
        // Username is wrong
        if(result.length == 0){
           return res.status(401).json({success:false, msg: "Username and/or password is incorrect"})
        } 

        const correctPassword = result[0].password
        if(correctPassword == password){
            res.status(200).json({success:true, msg: "Successful login"})
        } else {
            res.status(401).json({success:false, msg: "Username and/or password is incorrect"})
        }
        
    }).catch((err)=>{
        res.status(500).json({success:false, msg: "Server error"})
    })
    
  }
}