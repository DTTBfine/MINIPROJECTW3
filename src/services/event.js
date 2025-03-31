require('dotenv').config()
import { formatDate } from '../ultils/format'

const database = require('../config/Database')

export const addEvent = (e_name, e_describe, created_by, e_start_time, e_end_time, e_date, status) => new Promise(async (resolve, reject) => {
    // console.log('payload: ' + { e_name, e_describe, e_start_time, e_end_time, e_date, status, created_by })
    try {
        let sql, params

        sql = `INSERT INTO events (e_name, e_describe, created_by, e_start_time, e_end_time, e_date, status, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) `
        params = [e_name, e_describe, created_by, e_start_time, e_end_time, e_date, status]

        console.log('payload: ' + JSON.stringify({ e_name, e_describe, e_start_time, e_end_time, e_date, status, created_by }))

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            }
            else {
                resolve({
                    err: 0,
                    msg: 'Add Event is successfully !'
                })
            }
        })

    } catch (error) {
        reject(error)
    }
})

export const updateEvent = (id, userId, e_name, e_describe, e_start_time, e_end_time, status) => new Promise(async (resolve, reject) => {
    try {
        let sql, params

        //Kiểm tra xem sự kiện có phải của người dùng không đã
        sql = `SELECT * FROM events WHERE id = ? AND created_by = ?`
        params = [id, userId]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            }
            else if (result.length === 0) {
                resolve({
                    err: 2,
                    msg: 'Người dùng không có quyền!'
                })
            } else {
                sql = `UPDATE events SET e_name= ?, e_describe= ?, e_start_time= ?, e_end_time= ?, status= ? WHERE id = ? `
                params = [e_name, e_describe, e_start_time, e_end_time, status, id]

                database.query(sql, params, async (err1, result1) => {
                    if (err1) {
                        resolve({
                            err: 2,
                            msg: err1.message
                        })
                    }
                    else {
                        resolve({
                            err: 0,
                            msg: 'Chỉnh sửa thông tin thành công !'
                        })
                    }
                })
            }
        })

    } catch (error) {
        reject(error)
    }
})

export const markedEvent = (id, userId) => new Promise(async (resolve, reject) => {
    try {
        let sql, params

        //Kiểm tra xem sự kiện có phải của người dùng không đã
        sql = `SELECT * FROM events WHERE id = ? AND created_by = ?`
        params = [id, userId]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            }
            else if (result.length === 0) {
                resolve({
                    err: 2,
                    msg: 'Người dùng không có quyền!'
                })
            } else {
                sql = `UPDATE events SET completed = true WHERE id = ? ;`
                params = [id]

                database.query(sql, params, async (err1, result1) => {
                    if (err1) {
                        resolve({
                            err: 2,
                            msg: err1.message
                        })
                    }
                    else {
                        resolve({
                            err: 0,
                            msg: 'Đánh dấu hoàn thành thành công !'
                        })
                    }
                })
            }
        })

    } catch (error) {
        reject(error)
    }
})

export const deletedEvent = (id, userId) => new Promise(async (resolve, reject) => {
    try {
        let sql, params

        //Kiểm tra xem sự kiện có phải của người dùng không đã
        sql = `SELECT * FROM events WHERE id = ? AND created_by = ?`
        params = [id, userId]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            }
            else if (result.length === 0) {
                resolve({
                    err: 2,
                    msg: 'Người dùng không có quyền!'
                })
            } else {
                sql = `DELETE FROM events WHERE id = ? ;`
                params = [id]

                database.query(sql, params, async (err1, result1) => {
                    if (err1) {
                        resolve({
                            err: 2,
                            msg: err1.message
                        })
                    }
                    else {
                        resolve({
                            err: 0,
                            msg: 'Xóa event thành công !'
                        })
                    }
                })
            }
        })

    } catch (error) {
        reject(error)
    }
})

export const getEventInDate = (userId, date) => new Promise(async (resolve, reject) => {
    try {
        let sql, params

        sql = `SELECT * FROM events WHERE e_date = ?  AND created_by = ? ORDER BY e_start_time ASC;`
        params = [date, userId]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            }
            else {
                resolve({
                    err: 0,
                    msg: 'Lấy số lượng thành công !',
                    result
                })
            }
        })
    } catch (error) {
        reject(error)
    }
})

export const getEventInMonth = (userId, start_date, end_date) => new Promise(async (resolve, reject) => {
    try {
        let sql, params

        // const start_date = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
        // const end_date = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))

        // 
        sql = `SELECT
                    DATE_FORMAT(e_date, '%Y-%m-%d') AS day,
                    COUNT(*) AS event_count
                FROM
                    events
                WHERE
                    e_date BETWEEN ? AND ?
                    AND created_by = ?
                GROUP BY
                    day
                ORDER BY
                    e_date;`
        params = [start_date, end_date, userId]

        database.query(sql, params, async (err, result) => {
            if (err) {
                resolve({
                    err: 2,
                    msg: err.message
                })
            } else {
                // Khởi tạo mảng với 32 phần tử (1 đến 31), giá trị ban đầu là 0
                const eventCounts = new Array(32).fill(0); // Mảng từ 0 đến 31, nhưng chúng ta sẽ bỏ phần tử 0

                // Duyệt qua kết quả trả về từ database và cập nhật mảng eventCounts
                result.forEach(item => {
                    const dayIndex = parseInt(item.day.split('-')[2], 10); // Lấy ngày từ chuỗi 'YYYY-MM-DD'
                    eventCounts[dayIndex] = item.event_count; // Gán số lượng sự kiện vào vị trí tương ứng
                });

                // Trả về mảng từ 1 đến 31
                resolve({
                    err: 0,
                    msg: 'Lấy số lượng sự kiện theo ngày thành công !',
                    result: eventCounts.slice(1) // Cắt phần tử đầu tiên (index 0) để chỉ còn từ 1 đến 31
                });
            }
        })
    } catch (error) {
        reject(error)
    }
})