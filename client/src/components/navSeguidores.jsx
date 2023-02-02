import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";


export default function NavSeguidores({username}){
    var history = useHistory()
    return (
        <div className="navSeguidores">
            <div>
                <button onClick={() => history.push(`/profile/${username}`)}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
                <h4>{username}</h4>
            </div>
            <ul>
                <NavLink to={`/seguidores/${username}`}><li>Seguidores</li></NavLink>
                <NavLink to={`/seguidos/${username}`}><li>Seguidos</li></NavLink>
            </ul>
        </div>
    )
}