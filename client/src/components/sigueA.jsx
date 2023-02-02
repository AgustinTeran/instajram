import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PerfilUsuario } from "../redux/actions";
import Card from "./card";
import NavSeguidores from "./navSeguidores";


export default function SigueA(){
    var {username} = useParams()
    var {profile,user} = useSelector(state => state)
    var dispatch = useDispatch()

    useEffect(() => {
        if(username !== profile.name && !user.name !== username) dispatch(PerfilUsuario(username))
    },[])
    return (
        <div>
            <NavSeguidores username={username}/>
            <div className="resultadosUsuarios">
                {
                    profile.name == username? (
                        profile.sigueA?.map(e => {
                            return (
                                <Card key={e.name} name={e.name}/>
                            )
                        })
                    ) : (
                        user.sigueA?.map(e => {
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