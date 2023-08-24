import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../layout/Login"
import SignIn from "./SignIn";
import { useSelector } from "react-redux";
import {BsFillSunFill, BsMoonStarsFill} from "react-icons/bs"
import { FiLogOut, FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FaArrowUpFromBracket, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";



export default function Nav({setTheme,theme}){
  var [modal,setModal] = useState("login")

  
  var {auth} = useSelector(state => state)
  
  var items = auth.user? [
    {title: <AiFillHome className="h-7 w-7"/> ,route: "/"},
    {title:<AiOutlineSearch className="h-7 w-7"/>,route: "/search"},
    {title:<FaUser className="h-6 w-6"/>,route: "/profile"}
  ] : [
    {title:<AiFillHome className="h-7 w-7"/>,route: "/"},
    {title:<AiOutlineSearch className="h-7 w-7"/>,route: "/search"},
  ]
return (
  <nav className="max-w-5xl left-0 bg-base-100 right-0 mx-auto bottom-0 border-t-2 border-base-300 fixed w-full flex justify-evenly h-16 items-center z-50">
    {/* <ul className="flex justify-between m-2 gap-7 h-full items-center"> */}
      {
        items.map((e,i) => <NavLink exact to={`${e.route}`} className="text-base capitalize opacity-40" key={i}>{e.title}</NavLink>)
      }
    {/* </ul> */}
    {/* <div className="flex items-center gap-5 mx-3"> */}
      
      {
        auth.user? (
          <>
          <div className="dropdown dropdown-top dropdown-end">
            <label tabIndex={0}><FiSettings className="opacity-50 cursor-pointer w-7 h-7 text-base"/></label>
            <ul tabIndex={0} className="mt-2 dropdown-content border border-base-content flex flex-col gap-2 menu p-2 shadow bg-base-100 rounded-box w-52">
              {/* <li><Link className="flex gap-3 items-center" to={"/profile"}><CgProfile className="w-6 h-6"/><span>Perfil</span></Link></li> */}
              {
                theme == "myTheme"? (
                  <li><a onClick={() => setTheme(theme => theme == "myTheme"? "myDark" : "myTheme")}><BsMoonStarsFill  className="cursor-pointer w-8 h-8 "/><span>Modo Oscuro</span></a></li>
                ) : (
                  <li><a onClick={() => setTheme(theme => theme == "myTheme"? "myDark" : "myTheme")}><BsFillSunFill className="cursor-pointer w-8 h-8 text-base-200"/><span>Modo Claro</span></a></li> 
                )
              }
              <li><a className="flex gap-3 items-center" onClick={() => {localStorage.removeItem("token"); window.location.replace("/")}}><FiLogOut className="w-5 h-5"/><span>Cerrar sesión</span></a></li>
            </ul>
          </div>
          </>
        ) : (
          <>
            {
              theme == "myTheme"? (
                <BsMoonStarsFill onClick={() => setTheme(theme => theme == "myTheme"? "myDark" : "myTheme")} className="cursor-pointer opacity-50 w-6 h-6 "/>
              ) : (
                <BsFillSunFill onClick={() => setTheme(theme => theme == "myTheme"? "myDark" : "myTheme")} className="cursor-pointer opacity-50 w-7 h-7"/> 
              )
            }
            <label htmlFor="my-modal-4"><FaArrowUpFromBracket className="w-6 h-6 cursor-pointer opacity-50"/></label>
          </>
        )
      }
    {/* </div> */}

    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
    <label htmlFor="my-modal-4" className="modal cursor-pointer">
      <label className="modal-box relative !w-72">
        {
          modal === "login"? <Login setModal={setModal}/> : <SignIn setModal={setModal}/>
        }
      </label>
    </label>
  </nav>
)
}