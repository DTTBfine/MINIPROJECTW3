import actionTypes from '../actions/actionTypes'

const initState = {
    currentData: {},
    msg: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {},
                msg: action.msg || ''
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }

        default:
            return state;
    }
}

export default userReducer