import axiosConfig from '../axiosConfig'

export const apiAddEvent = (payload) => new Promise(async (resolve, reject) => {
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