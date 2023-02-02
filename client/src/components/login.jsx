import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Auth, CreateUser } from "../redux/actions";


export default function Singin(){
    var history = useHistory()
    var [state,setState] = useState({
        email: "",
        password: ""
    })

    var dispatch = useDispatch()

    function sub(e){
        e.preventDefault()
        if(state.email && state.password){
            dispatch(Auth(state))
            setState({
                email: "",
                password: ""
            })
        }  else alert("Complete los campos")
    }
    return (
        <div className="loginContainer">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={e => sub(e)}>
                <div>
                    <input type="text" placeholder="email" value={state.email} onChange={e => setState({...state,[e.target.placeholder]:e.target.value})}/>
                </div>
                <div>
                    <input type="text" placeholder="password" value={state.password} onChange={e => setState({...state,[e.target.placeholder]:e.target.value})}/>
                </div>
                <input type="submit"/>
            </form>
            <div className="signIn">
                <span>¿No tienes cuenta?</span>
                <button onClick={() => history.push("/singin")}>Crear cuenta</button>
            </div>
        </div>
    )
}