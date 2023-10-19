import axios from "axios"
import { back } from "../../config"
import backRoutes from "../../config/backRoutes";
import types from "./types"



function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function get(id){
  return function(dispatch){
    dispatch({type: types.GET_REQUEST})

    back.get(`${backRoutes.CHATS}/chat?id=${id}`,{headers: {token: localStorage.getItem("token")}})
    .then(res => dispatch({type: types.GET_SUCCESS, payload: {id, chat: res.data}}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}

function getAll(){
  return function(dispatch){
    dispatch({type: types.GETALL_REQUEST})

    back.get(`${backRoutes.CHATS}`,{headers: {token: localStorage.getItem("token")}})
    .then(res => {dispatch({type: types.GETALL_SUCCESS, payload: res.data})})
    .catch(err => {dispatch({type: types.GETALL_FAILURE, error: err.response.data})})
  }
}

function newMessage(chat,emisorName){
  return {
    type: types.UPDATE_CHATS,
    payload: {...chat,emisorName}
  }
}


function recived(chat){
  return {
    type: types.RECEIVED_MESSAGE,
    payload: chat
  }
}

function send(chat){
  return {
    type: types.SEND_MESSAGE,
    payload: chat
  }
}

function visto(destinatario){
  return function(dispatch){
    dispatch({type: types.VISTO_REQUEST,payload: destinatario})

    back.post(`${backRoutes.CHATS}/visto`,{usuarioQEnvio: destinatario},{headers: {token: localStorage.getItem("token")}})
    .then(() => console.log("Visto"))
    .catch(() => console.error("Hubo un error al marcar como visto"))
  }
}




export default {
  clearCurrent,
  get,
  getAll,
  visto,
  send,
  recived,
  newMessage,
}