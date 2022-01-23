import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult, PostsModel } from '../types/types'

const mysql = pool.promise()

class Posts implements PostsModel{

    username: string

    // Param: username of the user who's post you want to access
    //
    // Returns Posts object for the user who has the username from the param
    constructor(username: string) {
        this.username = username
    }

    //  Returns promise of mysql query result from search the titles and upload time of all posts made by user where user = this.username
    getAllUserPostsTitleAndTime = async (): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT post_id, title, created_at FROM posts WHERE uploader = ? ORDER BY post_id DESC'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [this.username])
        return result
    }

    // Param: postID -> postID of the post you want to search
    //
    // Returns promise of mysql query result from search of post by id made by user with username = this.username
    getUserPostByPostID = async (postID: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT title, body, created_at FROM posts WHERE post_id = ? && uploader = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [postID, this.username])
        return result
    }

    // Param: title -> title of new post
    // Param: body -> text body of new post
    // Param: created_at -> yyyy-mm-dd string of when the post was created 
    //
    // Returns promise of mysql query result from creating new post for user with username = this.username
    createNewUserPost = async (title: string, body: string, created_at: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [title, body, created_at, this.username])
        return result
    }

    // Param: postID -> postID of the post you want to update
    // Param: title -> new title
    // Param: body -> new text body
    //
    // Returns promise of mysql query result from updating post for user with username = this.username
    updateUserPost = async(postID: string, title: string, body: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [title, body, postID])
        return result
    }
    
    // Param: postID -> postID of the post you want to delete
    //
    // Returns promise of mysql query result from deleting post by id for user with username = this.username
    deleteUserPost = async(postID: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM posts WHERE post_id  = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [postID])
        return result
    }

    // Returns promise of mysql query result from deleting all posts for user with username = this.username
    deleteAllUserPosts = async(): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM posts WHERE uploader = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [this.username])
        return result
    }
}

export {Posts}

