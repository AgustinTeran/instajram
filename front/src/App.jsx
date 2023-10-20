import React, { useEffect, useState } from "react";
import "./assets/styles/index.scss";
import {useDispatch, useSelector} from "react-redux"
import authActions from "./redux/auth/actions"
import BigLoader from "./components/commons/bigLoader";
import 'react-toastify/dist/ReactToastify.css';
import UsersRoutes from "./routes/UsersRoutes";
import { onConect } from "./socket.io";





function App() {
  var [theme,setTheme] = useState(localStorage.theme || "myTheme")
  var dispatch = useDispatch()

  var {auth} = useSelector(state => state)

  useEffect(() => {
    localStorage.setItem("theme",theme)
  },[theme])

  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(authActions.get())
    } 
  },[])

  // useEffect(() => {
  //   if(auth.user){
  //     onConect(auth.user.id).emit("getUserOnline")
  //   }
  // },[auth.user]) 

  useEffect(() => {
    if(auth.error && auth.error === "No autorizado"){
      alert("Error al autenticarse")
      localStorage.removeItem("token")
      window.location.replace("/")
    }
  },[auth.error])


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
