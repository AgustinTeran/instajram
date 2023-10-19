import React, { useEffect } from "react";
import Main from "../components/layout/Main";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import chatActions from "../redux/chats/actions"
import { HiArrowRight } from "react-icons/hi";




export default function Chats(){
  var {list: chats} = useSelector(state => state.chats)  
  return (
    <Main>
      <h2 className="text-2xl font-semibold mb-9 mt-3 ml-3">Mensajes</h2>
      {/* <div className="flex flex-col gap-4"> */}
        {
          chats.items?.map((e,i) => {
            if(i + 1 === chats.items.length){
              return (
                <Link className={"text-xl flex mt-2 items-center justify-between py-3 px-5 rounded-xl mx-3 hover:bg-base-300 hover:opacity-50"} key={e.usuario} to={`/chat/${e.usuario}`}>
                  <div className="flex items-center gap-3">
                    <span>{e.name}</span>
                    {!e.visto && <span className="h-2 mt-1 w-2 bg-red-500 rounded-full"/>}
                  </div>
                  <HiArrowRight className="h-5 w-5"/>
                </Link>
              )
            }
            return (
              <div key={e.usuario}>
                
                <Link className={"text-xl mb-2 flex items-center justify-between py-3 px-5 rounded-xl mx-3 hover:bg-base-300 hover:opacity-50"} to={`/chat/${e.usuario}`}>
                  <div className="flex items-center gap-3">
                    <span>{e.name}</span>
                    {!e.visto && <span className="h-2 mt-1 w-2 bg-red-500 rounded-full"/>}
                  </div>
                  <HiArrowRight className="h-5 w-5"/>
                </Link>
                <hr className="border-base-300 w-[97%] mx-auto"/>
              </div>
            )
          })
        }
      {/* </div> */}
    </Main>
  )
}