import {combineReducers} from "redux"
import types from "./types"


export default function current(state = null,action){
  switch (action.type) {
    case types.CLEAR_CURRENT:
      return null
    case types.SET_SOCKET:
      return action.payload
    default:
      return state
  }
}