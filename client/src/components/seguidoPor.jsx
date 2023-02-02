import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PerfilUsuario } from "../redux/actions";
import Card from "./card";
import NavSeguidores from "./navSeguidores";


export default function SeguidoPor(){
    var {username} = useParams()
    var {user,profile} = useSelector(state => state)

    var dispatch = useDispatch()
    
    useEffect(() => {
        if(username !== profile.user && !user.name !== username) dispatch(PerfilUsuario(username))
    },[])
    return (
        <div>
            <NavSeguidores username={username}/>
            <div className="resultadosUsuarios">
                {
                    username == profile.name? (
                        profile.seguidoPor?.map(e => {
                            return (
                                <Card key={e.name} name={e.name}/>
                            )
                        })
                    ) : (
                        user.seguidoPor?.map(e => {
                            return (
                                <Card key={e.name} name={e.name}/>
                            )
                        })
                    )
                    
                }
            </div>
        </div>
    )
}