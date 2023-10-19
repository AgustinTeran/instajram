import React, { useEffect, useState } from "react";
import "./assets/styles/index.scss";
import {useDispatch, useSelector} from "react-redux"
import authActions from "./redux/auth/actions"
import BigLoader from "./components/commons/bigLoader";
import 'react-toastify/dist/ReactToastify.css';
import UsersRoutes from "./routes/UsersRoutes";
import { onConect } from "./socket.io";
import socketActions from "./redux/socket.io/actions";
import chatsActions from "./redux/chats/actions";





function App() {
  var [theme,setTheme] = useState(localStorage.theme || "myTheme")
  var dispatch = useDispatch()

  var [userId,setUserId] = useState(null)
  var [duplicado,setDuplicado] = useState(false)

  var {auth} = useSelector(state => state)

  useEffect(() => {
    localStorage.setItem("theme",theme)
  },[theme])

  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(authActions.get())
    } 
  },[])

  useEffect(() => {
    if(auth.user){
      

      if(!userId){
        var socket = onConect(auth.user.id,setDuplicado)
  
        dispatch(socketActions.setSocket(socket))
        dispatch(chatsActions.getAll())
      }

      setUserId(auth.user.id)
    }
  },[auth.user])

  useEffect(() => {
    if(auth.error && auth.error === "No autorizado"){
      alert("Error al autenticarse")
      localStorage.removeItem("token")
      window.location.replace("/")
    }
  },[auth.error])

  if(duplicado){
    return (
      <div className="h-screen w-screen bg-base-300 flex items-center justify-center">
        <div className="bg-base-100 py-6 mx-2 px-8 rounded-md max-w-xl shadow-xl">
          <span className="text-base">Tienes abierta la aplicación en otra ventana. Haz click en "Usar aquí" para abrirla en esta ventana</span>
          <div className="flex justify-end mt-5">
            <button onClick={() => {window.location.reload()}} className="btn btn-success text-base-100">Usar aquí</button>
          </div>
        </div>
      </div>
    )
  }


  if(localStorage.getItem("token") && !auth.user){
    return (
    <div data-theme={theme}>
      <BigLoader/>
    </div>
    )
  }
  
  return (
    <div className="min-h-screen h-full" data-theme={theme}>
      {  
        <UsersRoutes theme={theme} setTheme={setTheme} auth={auth}/> 
      }
    </div>
  );
}

export default App;
