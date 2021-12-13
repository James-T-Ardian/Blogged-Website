const mysql = require('../config/db')

class Users {
    createNewUser = async (username, password)=>{
        const sql = 'INSERT INTO users(username, password) VALUES(?, ?)'
        const [result, _] = await mysql.execute(sql, [username, password])
        return result
    }

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

let p = new Users()
p.createNewUser("fsdf", "xd").then((result)=>{
    console.log(result)
})
module.exports = Users