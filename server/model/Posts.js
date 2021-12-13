const mysql = require('../config/db')

class Posts {
    constructor(username) {
        this.username = username
    }

    getAllUserPostsTitleAndTime = async ()=>{
        const sql = 'SELECT title, created_at FROM posts WHERE uploader = ? ORDER BY created_at'
        const [result, _] = await mysql.execute(sql, [this.username])
        return result
    }

    getUserPostByPostID = async (postID)=>{
        const sql = 'SELECT * FROM posts WHERE post_id = ? && uploader = ?'
        const [result, _] = await mysql.execute(sql, [postID, this.username])
        return result
    }

    insertUserPost = async (title, body, created_at)=>{
        const sql = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)'
        const [result, _] = await mysql.execute(sql, [title, body, created_at, this.username])
        return result
    }

    updateUserPost = async(postID, title, body)=>{
        const sql = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?'
        const [result, _]  = await mysql.execute(sql, [title, body, postID])
        return result
    }
    
    deleteUserPost = async(postID)=>{
        const sql = 'DELETE FROM posts WHERE post_id  = ?'
        const [result, _]  = await mysql.execute(sql, [postID])
        return result
    }

    // VERY DANGEROUS CODE, UNCOMMENT ONLY WHEN ACTUALLY USED
    // deleteAllUserPosts = async()=>{
    //     const sql = 'DELETE FROM posts WHERE uploader = ?'
    //     const [result, _]  = await mysql.execute(sql, [this.username])
    //     return result
    // }
}


module.exports = Posts

