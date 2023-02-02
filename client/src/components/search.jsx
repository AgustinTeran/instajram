import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchUser } from "../redux/actions";
import Card from "./card";

export default function Search(){
    var [search,setSearch] = useState("")
    var dispatch = useDispatch()
    var {users} = useSelector(state => state)

    useEffect(() => {
        if(search) dispatch(SearchUser(search))
    },[search])
    return (
        <div className="searchContainer"> 
            <div className="barraDeBusqueda">
                <input type="text" value={search} onChange={e => {setSearch(e.target.value)}}/>
            </div>
            <div className="resultadosUsuarios">
                {
                    users.length && search !== ""? (
                        users.map(e => <Card key={e.name} name={e.name}/>)
                    ) : (
                        search == ""? (
                            <h3>Busque usuarios</h3>
                        ) : (
                            <h3>No se enontraron coincidencias</h3>
                        )
                    )
                }
            </div>
        </div>
    )
}