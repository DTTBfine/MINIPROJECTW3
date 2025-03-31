import axiosConfig from '../axiosConfig'

export const apiAddEvent = (payload) => new Promise(async (resolve, reject) => {
    console.log('Api thêm lịch trình')
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/event/add-event',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateEvent = (payload) => new Promise(async (resolve, reject) => {
    console.log('Api chỉnh sửa lịch trình')
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/event/update-event',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteEvent = (payload) => new Promise(async (resolve, reject) => {
    console.log('Api xóa lịch trình')
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/event/delete-event',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetEventInDate = (payload) => new Promise(async (resolve, reject) => {
    console.log('Api lấy danh sách lịch trình trong ngày')
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/event/get-event-in-date',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetEventInMonth = (payload) => new Promise(async (resolve, reject) => {
    console.log('Api lấy danh sách các ngày có lịch trình trong tháng')
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/event/get-event-in-month',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})