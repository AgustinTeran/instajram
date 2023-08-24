import React, { useEffect } from "react";
import Main from "../components/layout/Main";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import chatActions from "../redux/chats/actions"




export default function Chats(){
  var dispatch = useDispatch()
  var {list: chats} = useSelector(state => state.chats)

  useEffect(() => {
    dispatch(chatActions.getAll())
  },[])
  
  return (
    <Main>
      <h4 className="text-center text-2xl">En desarrollo...</h4>
    </Main>
  )
}