import { combineReducers } from "redux";

import usersReducers from "./users/reducers"
import authReducers from "./auth/reducers"
import chatsReducers from "./chats/reducers"
import socketsReducers from "./socket.io/reducers"




export default combineReducers({
    users: usersReducers,
    auth: authReducers,
    chats: chatsReducers,
    socket: socketsReducers,
})