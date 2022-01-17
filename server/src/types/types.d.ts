import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2";

export type MySQLQueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

export interface UsersModel {
    async createNewUser(username: string, password: string): Promise<MySQLQueryResult>
    async getPassword(username: string): Promise<MySQLQueryResult>
    async deleteUser(username: string): Promise<MySQLQueryResult>
    
}

export interface PostsModel {
    username:string
    async getAllUserPostsTitleAndTime(): Promise<MySQLQueryResult>
    async getUserPostByPostID(postID: string): Promise<MySQLQueryResult>
    async createNewUserPost(title: string, body: string, created_at: string): Promise<MySQLQueryResult>
    async updateUserPost(postID: string, title: string, body: string): Promise<MySQLQueryResult>
    async deleteUserPost(postID: string): Promise<MySQLQueryResult>
    async deleteAllUserPosts(): Promise<MySQLQueryResult>


}