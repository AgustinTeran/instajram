import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from "react-router-dom"
import { Perfil } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faMagnifyingGlass, faArrowRightFromBracket, faArrowRightToBracket, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Nav(){
    var dispatch = useDispatch()
    var {user,profile} = useSelector(state => state)

    useEffect(() => {
        if(localStorage.token){
            dispatch(Perfil())
        }
    },[])

    return (
        <div className="navContainer">
            <ul>
                <NavLink exact to={"/"}><li><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></li></NavLink>
                <NavLink exact to={"/search"}><li><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></li></NavLink>

                {
                    profile.name? (
                        <>
                        
                        <NavLink exact to={`/profile/${profile.name}`}><li><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></li></NavLink>
                        <li onClick={() => {localStorage.removeItem("token"); window.location.replace("/")}}><FontAwesomeIcon className="exit" icon={faArrowRightFromBracket}></FontAwesomeIcon></li>
                        </>
                    ) : (
                        <>
                        <NavLink exact to={"/login"}><li><FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon></li></NavLink>
                        </>
                    )
                }
            </ul>
        </div>
    )
}