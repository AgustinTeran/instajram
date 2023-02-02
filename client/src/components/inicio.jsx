import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DejarSeguir, Perfil, Seguir } from "../redux/actions";
import Card from "./card";


export default function Inicio(){
    var dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(UsersList())
    // },[])
    var {profile} = useSelector(state => state)
    return (
        <div>
            Estas en el home
        </div>
    )
}