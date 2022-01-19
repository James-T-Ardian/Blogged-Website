import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2"

// Workaround to allow certain variables to exists in all types specified under MySQLQueryCombinedTypes
type MySQLQueryCombinedTypes = OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]
export interface MySQLQueryResult extends MySQLQueryCombinedTypes {
    length?: number
    insertId?: number
    affectedRows?: number
}

// Interface for the Users class in model folder
export interface UsersModel {
    async createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    async getPassword(username: string): Promise<MySQLQueryResult>
    async deleteUser(username: string): Promise<MySQLQueryResult>
    
}

// Interface for the Post class in model folder
export interface PostsModel {
    username:string
    async getAllUserPostsTitleAndTime(): Promise<MySQLQueryResult>
    async getUserPostByPostID(postID: string): Promise<MySQLQueryResult>
    async createNewUserPost(title: string, body: string, created_at: string): Promise<MySQLQueryResult>
    async updateUserPost(postID: string, title: string, body: string): Promise<MySQLQueryResult>
    async deleteUserPost(postID: string): Promise<MySQLQueryResult>
    async deleteAllUserPosts(): Promise<MySQLQueryResult>
}

// Declaration merging to explicitly define what data will exists inside each session
declare module 'express-session' {
    export type SessionUser = string | undefined

    export interface SessionData {
      user: SessionUser
    }
}

// Declaration merging to explicitly define what type of data will exists in request params and request body
declare module 'express' {

    export interface Request {
      body: { [key: string]: string}
      params: { [key: string]: string}
    }
}


