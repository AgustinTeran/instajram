import types from "./types"


function clearCurrent(){
  return function(dispatch){
    dispatch({type: types.CLEAR_CURRENT})
  }
}

function setSocket(socket){
  return {
    type: types.SET_SOCKET,
    payload: socket
  }
}



export default {
  clearCurrent,
  setSocket
}