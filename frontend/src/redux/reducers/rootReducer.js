import {combineReducers} from "redux"
import articlesReducer from "./articlesReducer.js"
import usersReducer from "./usersReducer.js"

const rootReducer = combineReducers({
    articles: articlesReducer,
    users: usersReducer
})
export default rootReducer