import actionTypes from './actionTypes'
import * as apis from '../../services'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiRegister(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token,
                id: response.data.id
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token,
                id: response.data.id
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }


    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})