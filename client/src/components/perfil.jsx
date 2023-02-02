import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PerfilUsuario, DejarSeguir, Seguir } from "../redux/actions";



export default function Perfil(){
    var {username} = useParams()
    var dispatch = useDispatch()
    var {user,profile} = useSelector(state => state)

    useEffect(() => {
        if(username !== profile.name) dispatch(PerfilUsuario(username))
    },[username])

    return (
        <div className="perfilContainer">
            {
               profile.name == username? (
                <>
                <div className="usuario">
                    <h1>{profile.name}</h1>
                    <h3>{profile.email}</h3>
                </div>
                <div className="follows">
                    <div className="seguidores">
                        <h4>seguidores</h4>
                        <Link to={`/seguidores/${profile.name}`}>
                            <button>
                                {
                                    profile.seguidoPor?.length 
                                }
                            </button>
                        </Link>
                    </div>
                    <div className="seguidores">
                        <h4>seguidos</h4>
                        <Link to={`/seguidos/${profile.name}`}>
                            <button>
                                {
                                    profile.sigueA?.length 
                                }
                            </button>
                        </Link>
                    </div>
                </div>
                </>
               ) : (
            <div className="container">
                <div className="perfil">
                    <div className="usuario">
                        <h1>{user.name}</h1>
                        <h3>{user.email}</h3>
                    </div>
                    <div className="follows">
                        <div className="seguidores">
                            <h4>seguidores</h4>
                            <Link to={`/seguidores/${user.name}`}>
                                <button>
                                    {
                                        user.seguidoPor?.length 
                                    }
                                </button>
                            </Link>
                        </div>
                        <div className="seguidores">
                            <h4>seguidos</h4>
                            <Link to={`/seguidos/${user.name}`}>
                                <button>
                                    {
                                        user.sigueA?.length 
                                    }
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                    <input onClick={e => {
                        if(e.target.value == "seguir"){
                            dispatch(Seguir(profile.name,user.name))
                        }else{
                            dispatch(DejarSeguir(profile.name,user.name))
                        }
                        dispatch(PerfilUsuario(user.name))
                    }}
                    type="button"
                       value={
                            profile.sigueA?.filter(e => e.name == user.name).length? (
                                "dejar de seguir"
                            ) : (
                                "seguir"
                            )
                        }
                    />
            </div>
               ) 
            }
            
        </div>
    )
}