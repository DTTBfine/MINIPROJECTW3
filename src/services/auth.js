import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
require('dotenv').config()

const database = require('../config/Database')

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ username, password, email, sdt }) => new Promise(async (resolve, reject) => {
    try {
        let sql, params
        // Kiểm tra xem username đã tồn tại trong db hay chưa
        sql = `SELECT * FROM users WHERE sdt = ?`
        params = [sdt]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message,
                    token: null
                })
            }
            else if (result.length > 0) {
                resolve({
                    err: 2,
                    msg: 'Phone number has been already used !',
                    token: null
                })
            }
            else {
                // Mã hóa mật khẩu
                const hashedPassword = hashPassword(password)
                const idUser = v4()

                // Insert Data
                sql = `INSERT INTO users (id, username, password, email, sdt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
                params = [idUser, username, hashedPassword, email, sdt]

                database.query(sql, params, (err, result) => {
                    if (err) {
                        resolve({
                            err: 2,
                            msg: err.message,
                            token: null
                        })
                    } else {
                        const token = jwt.sign({ id: idUser, sdt: sdt }, process.env.SECRET_KEY, { expiresIn: '2d' })
                        resolve({
                            err: 0,
                            msg: 'Register is successfully !',
                            token: token,
                            id: idUser
                        })
                    }
                })

            }
        })


    } catch (error) {
        reject(error)
    }
})

export const loginService = ({ sdt, password }) => new Promise(async (resolve, reject) => {
    try {
        let sql, params
        // Kiểm tra xem username đã tồn tại trong db hay chưa
        sql = `SELECT * FROM users WHERE sdt = ?`
        params = [sdt]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message,
                    token: null
                })
            }
            else if (result.length > 0) {
                const user = result[0]
                const isCorrectPassword = bcrypt.compareSync(password, user.password)

                if (!isCorrectPassword) {
                    resolve({
                        err: 2,
                        msg: 'Password is wrong',
                        token: null
                    })
                } else {
                    const token = jwt.sign({ id: user.id, sdt: user.sdt }, process.env.SECRET_KEY, { expiresIn: '2d' })
                    resolve({
                        err: 0,
                        msg: 'Login is successful !',
                        token: token,
                        id: user.id
                    })
                }
            } else {
                resolve({
                    err: 2,
                    msg: 'Phone number not found !',
                    token: null
                })
            }
        })

    } catch (error) {
        reject(error)
    }
})