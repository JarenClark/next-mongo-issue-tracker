import axios from 'axios'
import { server } from '../../config'
import {
    // list
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,
    //single
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/projectConstants'

// get all projects
export const getProjects = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${server}/api/projects`)

        dispatch({
            type: ALL_PROJECTS_SUCCESS,
            payload: data
        })

    } catch (error) {
alert(error)
        dispatch({
            type: ALL_PROJECTS_FAIL,
            payload: error?.response?.data?.message || 'Failed to fetch projects'
        })

    }
}

// get single Project
export const getProjectDetails = (id) => async (dispatch) => {

    try {
        const url = `${server}/api/projects/${id}`;
        const { data } = await axios.get(url)
        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(`error is ${error}`)
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error?.response?.data?.message || 'Failed to fetch project'
        })

    }
}

// clear project errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}