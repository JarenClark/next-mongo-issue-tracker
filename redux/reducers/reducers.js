import { combineReducers } from "redux";
import { allProjectsReducer, projectDetailsReducer } from "./projectReducer";
const reducers = combineReducers({
    allProjects: allProjectsReducer,
    project: projectDetailsReducer
})

export default reducers