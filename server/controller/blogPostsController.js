const Posts = require('../model/Posts')

module.exports = {
    getBlogPostsTitleTime : (req, res) => {
        const userThatOwnsPosts = req.params.username
        const userThatSeesPosts = req.session.user
        const postsModel = new Posts(userThatOwnsPosts)

        if(userThatSeesPosts == undefined){
            return res.status(401).json({loggedIn: false, isOwner: false, posts: [], msg: "User needs to log in first"})
        }

        postsModel.getAllUserPostsTitleAndTime()
        .then((result)=>{
            if(userThatSeesPosts == userThatOwnsPosts){
                return res.status(200).json({loggedIn: true, isOwner: true, posts: result, msg: "User obtained their own posts"})
            } else {
                return res.status(200).json({loggedIn: true, isOwner: false, posts: result, msg: "User obtained another's post if the other person exists as a user"})
            }
        }).catch((err)=>{
            return res.status(500).json({loggedIn: false, isOwner: false, posts: [], msg: "Server error"})
        })

    }
}