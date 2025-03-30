import actionTypes from '../actions/actionTypes'

const initState = {
    isLoggedIn: false,
    token: null,
    id: null,
    msg: '',
    update: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                id: action.id,
                msg: ''
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                id: null,
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                id: null,
                msg: ''
            }

        default:
            return state;
    }
}

export default authReducer