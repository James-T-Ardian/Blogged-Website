import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult, PostsModel } from '../types/types'

const mysql = pool.promise()

class Posts implements PostsModel{

    username: string

    constructor(username: string) {
        this.username = username
    }

    getAllUserPostsTitleAndTime = async (): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT post_id, title, created_at FROM posts WHERE uploader = ? ORDER BY post_id DESC'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [this.username])
        return result
    }

    getUserPostByPostID = async (postID: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT title, body, created_at FROM posts WHERE post_id = ? && uploader = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [postID, this.username])
        return result
    }

    createNewUserPost = async (title: string, body: string, created_at: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [title, body, created_at, this.username])
        return result
    }

    updateUserPost = async(postID: string, title: string, body: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [title, body, postID])
        return result
    }
    
    deleteUserPost = async(postID: string): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM posts WHERE post_id  = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [postID])
        return result
    }

    deleteAllUserPosts = async(): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM posts WHERE uploader = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]]  = await mysql.execute(sql, [this.username])
        return result
    }
}

export {Posts}

