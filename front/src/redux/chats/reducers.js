import {combineReducers} from "redux"
import types from "./types"


export function current(state={
  item: null,
  loading: false,
  error: null
},action){
  switch (action.type) {
    case types.CLEAR_CURRENT:
      return {
        ...state,
        item: null
      }
    case types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.POST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.POST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.POST_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case types.SEND_MESSAGE: 
      return {
        ...state,
        item: {...state.item,chat: [...state.item.chat, action.payload]}
      }
    case types.RECEIVED_MESSAGE: 
      return {
        ...state,
        item: {...state.item,chat: [...state.item.chat, action.payload]}
      }
    default:
      return state
  }
}

export function list(state = {
  items: null,
  loading: false,
  error: null,
}, action){
  switch (action.type) {
    case types.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CLEAR_ALL:
      return {
        ...state,
        items: null
      }
    case types.GETALL_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case types.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case types.VISTO_REQUEST: 
      let indice = state.items.findIndex(e => e.usuario === action.payload)
      let arrayActualizado = state.items
      arrayActualizado[indice].visto = true
      return {
        ...state,
        items: arrayActualizado
      }
    case types.UPDATE_CHATS:
      let index = state.items.findIndex(e => e.usuario === action.payload.userId)
      console.log("AAA",action.payload.userId);
      // si ya me habia mandando un mensaje antes
      if(index + 1){
        var nuevoArray = state.items
        nuevoArray.splice(index,1)

        console.log({nuevoArray});

        return {
          ...state,
          items: [{usuario: action.payload.userId,visto: action.payload.leido,name: action.payload.emisorName},...nuevoArray]
        }
      }else{
        return {
          ...state,
          items: [{usuario: action.payload.userId,visto: action.payload.leido,name: action.payload.emisorName},...state.items]
        }
      }
    default:
      return state
  }
}


export default combineReducers({
  current,
  list
})