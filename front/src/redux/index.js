import { combineReducers } from "redux";

import usersReducers from "./users/reducers"
import authReducers from "./auth/reducers"
import chatsReducers from "./chats/reducers"




export default combineReducers({
    users: usersReducers,
    auth: authReducers,
    chats: chatsReducers
})