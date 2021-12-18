module.exports = {
    logOutUser: (req, res)=>{
        res.clearCookie("username")
        res.status(200).json({loggedOut: true, msg: "User has been logged out"})
    }
}