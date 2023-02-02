import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DejarSeguir, Seguir } from "../redux/actions";


export default function Card({name}){
    var {profile} = useSelector(state => state)
    var dispatch = useDispatch()
    var history = useHistory()
    return (
        <div className="cardContainer">
            <h5
             onClick={() => {
                if(localStorage.token) history.push(`/profile/${name}`)
             }}
             style={{cursor:"pointer"}}>
                {name}
            </h5>
            {
                profile.sigueA && profile.name !== name? (
                    <input onClick={e => {
                        if(e.target.value == "seguir"){
                            dispatch(Seguir(profile.name,name))
                        }else{
                            dispatch(DejarSeguir(profile.name,name))
                        }
                    }}
                    type="button"
                       value={
                            profile.sigueA?.filter(e => e.name == name).length? (
                                "dejar de seguir"
                            ) : (
                                "seguir"
                            )
                        }
                    />
                ) : null
            }
        </div>
        )
}