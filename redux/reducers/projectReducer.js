import {
    // list
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,
    //single
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,

    CLEAR_ERRORS,
    
} from '../constants/projectConstants'


export const allProjectsReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case ALL_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.payload.projects
            }

        case ALL_PROJECTS_FAIL:
            return {
                ...state,
                projects: []
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const projectDetailsReducer = (state= { project: {} }, action) => {
    switch (action.type) {
        case PROJECT_DETAILS_SUCCESS:
            return {
                ...state,
                project: action.payload.project
            }

        case PROJECT_DETAILS_FAIL:
            return {
                ...state,
                project: {}
            }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}