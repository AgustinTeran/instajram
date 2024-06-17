import React, { useEffect, useRef, useState } from "react";
import Main from "../components/layout/Main";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import chatsActions from "../redux/chats/actions"
import { FaRegPaperPlane } from "react-icons/fa6";



export default function Chat(){
  var {id} = useParams()
  var dispatch = useDispatch()
  var {socket,chats,auth} = useSelector(state => state)

  useEffect(() => {
    if(!chats.current.item || chats.current.item.id !== id){
      dispatch(chatsActions.get(id))
    }
  },[])

  

  var ultimoMensaje = useRef()

  useEffect(() => {
    if (ultimoMensaje.current) {
      window.scrollTo({
        top: ultimoMensaje.current.offsetTop,
        // behavior: 'smooth' 
    });}

    if(chats.list.items){
      dispatch(chatsActions.visto(id))
    }
    
    },[chats.current.item])

  return (
    <>
    <Main className={`h-[calc(100%-128px)] pb-32`}>
      {
        !chats.current.item || chats.current.loading && <span>Loading</span>
      }
      {
        chats.current.item && !chats.current.loading && (
          <>
            {
              chats.current.item.chat.map((e,i) => {
                if(i + 1 === chats.current.item.chat.length){
                  if(e.userId === id){
                    return (
                      <div key={e.id} ref={ultimoMensaje} className="chat chat-start">
                        <div className="chat-bubble break-all">{e.mensaje}</div>
                      </div>
                    )
                  }else{
                    return (
                      <div key={e.id} ref={ultimoMensaje} className="chat chat-end">
                        <div className="chat-bubble break-all">{e.mensaje}</div>
                      </div>
                    )
                  }

                }
                if(e.userId === id){
                  return (
                    <div key={e.id} className="chat chat-start">
                      <div className="chat-bubble break-all">{e.mensaje}</div>
                    </div>
                  )
                }else{
                  return (
                    <div key={e.id} className="chat chat-end">
                      <div className="chat-bubble break-all">{e.mensaje}</div>
                    </div>
                  )
                }
              }
              )
            }
          </>
        )
      }
    </Main>
      <form onSubmit={(e) => {
        e.preventDefault()


        socket.emit("message",e.target[0].value,id,auth.user.id,auth.user.name)
        e.target[0].value = ""
      }} className="fixed bottom-16 py-2 right-0 left-0 mx-auto w-full px-2 max-w-4xl bg-base-100">
        <input type="text" className="input border-2 input-bordered w-full rounded-full pr-16"/>
        <button className="absolute right-5 top-0 bottom-0"><FaRegPaperPlane className="mr-4 opacity-60 w-6 h-6"/></button>
      </form>
      </>
  )
}