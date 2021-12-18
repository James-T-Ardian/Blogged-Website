const Users = require('../model/Users')
const bcrypt = require('bcrypt')

module.exports = {
  checkIfLoggedIn: (req, res)=>{
    if(req.session.user){
      return res.status(200).json({loggedIn: true, username: req.session.user, msg: "User already logged in"})
    } else {
      return res.status(401).json({loggedIn: false, username: "" ,msg: "User has not logged in"})
    }
  },

  logInUser : (req, res) => {
    const {username, password} = req.body
    const userModel = new Users()

    userModel.getPassword(username)
    .then((result)=>{
        if(result.length == 0){
           return res.status(401).json({loggedIn: false, username: "" , msg: "Username and/or password is incorrect"})
        } 

        bcrypt.compare(password, result[0].password, (error, response)=>{
          if(error){
            return res.status(500).json({loggedIn: false, username: "" , msg: "Server error"})
          }
          
          if(response){
            req.session.user = username
            return res.status(200).json({loggedIn: true, username: req.session.user, msg: "User has logged in successfully"})
          } else {
            return res.status(401).json({loggedIn: false, username: "" , msg: "Username and/or password is incorrect"})
          }
        })
    }).catch((err)=>{
        return res.status(500).json({loggedIn: false, username: "" , msg: "Server error"})
    })
    
  }
}