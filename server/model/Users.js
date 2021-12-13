const mysql = require('../config/db')

class Users {
    getPassword = async (username)=>{
        const sql = 'SELECT password FROM users WHERE username = ?'
        const [result, _] = await mysql.execute(sql, [username])
        return result
    }

    // VERY DANGEROUS CODE, UNCOMMENT ONLY WHEN ACTUALLY USED
    // deleteUser = async (username)=>{
    //     const sql = 'DELETE FROM users WHERE username =?'
    //     const [result, _] = await mysql.execute(sql, [username])
    //     return result
    // }
}

module.exports = Users