import jwt from 'jsonwebtoken'
require('dotenv').config()

const database = require('../config/Database')

export const getUserById = (id) => new Promise(async (resolve, reject) => {
    try {
        let sql, params
        sql = `SELECT * FROM users WHERE id = ?`
        params = [id]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 1,
                    msg: err.message
                })
            }
            else if (result.length === 0) {
                resolve({
                    err: 1,
                    msg: 'User not found !'
                })
            }
            else {
                const user = result[0]
                user.password = undefined
                resolve({
                    err: 0,
                    msg: 'Success!',
                    user
                })
            }

        })

    } catch (error) {
        reject(error)
    }
})
