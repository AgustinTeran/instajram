import axios from "axios"
import { back } from "../../config"
import backRoutes from "../../config/backRoutes";
import types from "./types"


function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function get(){
  return function(dispatch){
    dispatch({type: types.GET_REQUEST})

    back.get(`${backRoutes.USERS}/perfil`,{headers: {token: localStorage.getItem("token")}})
    .then(res => dispatch({type: types.GET_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: types.GET_FAILURE, error: err.response.data}))
  }
}


function post(user){
  return function(dispatch){
    dispatch({type: types.POST_REQUEST})

    if(user.name){
      back.post(`${backRoutes.USERS}/`,{...user})
      .then(res => {localStorage.setItem("token",res.data); dispatch({type: types.POST_SUCCESS})})
      .then(() => window.location.replace("/"))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }else{
      back.post(`${backRoutes.USERS}/auth`,{...user})
      .then(res => {console.log(res.data);localStorage.setItem("token",res.data); dispatch({type: types.POST_SUCCESS})})
      .then(() => window.location.replace("/"))
      .catch(err => dispatch({type: types.POST_FAILURE, error: err.response.data}))
    }
  }
}



export default {
  clearCurrent,
  get,
  post,
}