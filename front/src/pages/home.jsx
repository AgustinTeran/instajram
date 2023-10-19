import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import {FaRegPaperPlane} from "react-icons/fa6"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux"


export default function Home(){
  var {list: chats} = useSelector(state => state.chats)
  var [mensajeSinLeer,setMensajesSinLeer] = useState(null)

  useEffect(() => {
    if(chats.items){
      setMensajesSinLeer(() => null)
      chats.items.forEach(e => {if(!e.visto) setMensajesSinLeer(prev => prev + 1)})
    }
  },[chats])

  return (
    <>
    {
      localStorage.getItem("token") && (
        <div className="pt-4 px-6 pb-2 flex items-end border-base-300 justify-end bg-base-100 max-w-5xl border-b-[1px] mx-auto right-0 left-0 fixed w-full">
          <div className="indicator">
            {
              mensajeSinLeer && <span className="indicator-item badge bg-red-500 text-white border-none">{mensajeSinLeer}</span>
            }
            <Link to={"/chats"} className="p-2 rounded-full  border-base-300"><FaRegPaperPlane className="h-7 w-7 cursor-pointer"/></Link>
          </div>
        </div>
      )
    }
    
    <Main className={`${localStorage.getItem("token") && "pt-20"}`}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, mollitia culpa atque error exercitationem, quidem perspiciatis cupiditate id nisi, officia aliquam sint quam similique aut? Quas corporis modi magnam fugiat.
    </Main>
    </>
  )
}