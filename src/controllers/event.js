import * as eventService from '../services/event'

export const getEventById = async (req, res) => {
    const userId = req.user.id
    const { id } = req.body

    try {
        if (!userId) return res.status(400).json({
            err: 1,
            msg: 'Missing id uesr input !'
        })
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing id event input !'
        })
        const response = await eventService.getEventById(userId, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const addEvent = async (req, res) => {
    const created_by = req.user.id
    const { e_name, e_describe, e_start_time, e_end_time, e_date, status } = req.body

    try {
        if (!e_name || !e_start_time || !e_end_time || !e_date || !status || !created_by) return res.status(400).json({
            err: 1,
            msg: 'Missing input !'
        })
        const response = await eventService.addEvent(e_name, e_describe, created_by, e_start_time, e_end_time, e_date, status)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const updateEvent = async (req, res) => {
    const userId = req.user.id
    const { id, e_name, e_describe, e_start_time, e_end_time, status } = req.body

    try {
        if (!e_name || !e_start_time || !e_end_time || !status || !id || !userId) return res.status(400).json({
            err: 1,
            msg: 'Missing input !'
        })
        const response = await eventService.updateEvent(id, userId, e_name, e_describe, e_start_time, e_end_time, status)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const markedEvent = async (req, res) => {
    const userId = req.user.id
    const { id } = req.body

    try {
        if (!id || !userId) return res.status(400).json({
            err: 1,
            msg: 'Missing input !'
        })
        const response = await eventService.markedEvent(id, userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const deletedEvent = async (req, res) => {
    const userId = req.user.id
    const { id } = req.body

    try {
        if (!id || !userId) return res.status(400).json({
            err: 1,
            msg: 'Missing input !'
        })
        const response = await eventService.deletedEvent(id, userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const getEventInDate = async (req, res) => {
    const userId = req.user.id
    const { date } = req.body

    try {
        if (!userId) return res.status(400).json({
            err: 1,
            msg: 'Missing id input !'
        })
        if (!date) return res.status(400).json({
            err: 1,
            msg: 'Missing date input !'
        })
        const response = await eventService.getEventInDate(userId, date)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}

export const getEventInMonth = async (req, res) => {
    const userId = req.user.id
    const { start_date, end_date } = req.body

    try {
        if (!start_date || !end_date || !userId) return res.status(400).json({
            err: 1,
            msg: 'Missing input !'
        })
        const response = await eventService.getEventInMonth(userId, start_date, end_date)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at event controller: ' + error
        })
    }
}