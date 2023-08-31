import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

export const userReducer = (state = { user: {}}, actions) => {
    switch (actions.type) {
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const allUsersReducer = (state = { users: [] }, actions) => {
    switch (actions.type) {
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}