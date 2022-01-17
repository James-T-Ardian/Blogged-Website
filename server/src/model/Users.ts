import {pool} from '../config/db'
import {FieldPacket} from 'mysql2'
import { MySQLQueryResult, UsersModel } from '../types/types'

const mysql = pool.promise()

class Users implements UsersModel{
    createNewUser = async (username:string, password:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'INSERT INTO users(username, password) VALUES(?, ?)'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username, password])
        return result
    }

    getPassword = async (username:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'SELECT password FROM users WHERE username = ?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }

    deleteUser = async (username:string): Promise<MySQLQueryResult>=>{
        const sql: string = 'DELETE FROM users WHERE username =?'
        const [result, _]: [MySQLQueryResult, FieldPacket[]] = await mysql.execute(sql, [username])
        return result
    }
}




export {Users}