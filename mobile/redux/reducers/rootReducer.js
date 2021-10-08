import {combineReducers} from "redux"
import usersReducer from "./usersReducer.js"

const rootReducer = combineReducers({
    users: usersReducer
})
export default rootReducer