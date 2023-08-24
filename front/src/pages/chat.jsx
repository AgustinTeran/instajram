import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux"



export default function Chat(){
  var {id} = useParams()
  var dispatch = useDispatch()

  useEffect(() => {
    
  },[])

  var [mensaje,setMensaje] = useState("")

  return (
    <Main>
      <h4 className="text-center text-2xl">En desarrollo...</h4>
    </Main>
  )
}