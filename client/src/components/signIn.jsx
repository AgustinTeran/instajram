import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateUser } from "../redux/actions";


export default function Login(){
    var dispatch = useDispatch()
    var history = useHistory()

    var name = useRef()
    var email = useRef()
    var password = useRef()


    function onSub(e){
        e.preventDefault()
        dispatch(CreateUser({name: name.current.value,email: email.current.value,password: password.current.value.toString()}))
        name.current.value = ""
        email.current.value = ""
        password.current.value = ""
    }
    return (
        <div className="loginContainer">
            <h1>Registrate</h1>
            <form onSubmit={onSub}>
                <div>
                    <input type="text" ref={name} placeholder={"nombre de usuario"}/>
                </div>
                <div>
                    <input type="text" ref={email} placeholder={"email"}/>
                </div>
                <div>
                    <input type="text" ref={password} placeholder={"contraseña"}/>
                </div>
                <input type="submit"/>
            </form>
            <div className="signIn">
                <span>¿Ya tienes cuenta?</span>
                <button onClick={() => history.push("/login")}>Ingresar</button>
            </div>
        </div>
    )
}