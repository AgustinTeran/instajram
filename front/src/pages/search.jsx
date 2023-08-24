import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import {useDispatch, useSelector} from "react-redux"
import userActions from "../redux/users/actions"
import { Link } from "react-router-dom"
import Loader from "../components/commons/loader"
import UsersCard from "../components/customs/usersCard";



export default function Search(){
  var users = useSelector(state => state.users.list)
  var {auth} = useSelector(state => state)
  var [search,setSearch] = useState("")
  var dispatch = useDispatch()

  useEffect(() => {
    if(search){
      var action = dispatch(userActions.getAll(search))
    }

    return () => {
      if(typeof action === "object"){
        action.cancel()
      }
    }

  },[search])

  return (
    <Main>
      <input type="text" className="m-3 input bg-base-100 w-[calc(100%-24px)] border-base-content border-2" value={search} onChange={e => setSearch(e.target.value)}/>
      {
        !search && <h3 className="text-center text-xl font-medium">Busque usuarios</h3>
      }
      {
        users.loading && <Loader/>
      }
      {
        search && users.items && !!users.items.length && !users.loading && users.items.map(e => {
          if(e.id !== auth.user?.id){
            return <UsersCard key={e.id} id={e.id} btn={localStorage.getItem("token")? true : false} btnFollow={!auth.user?.sigueA.find(u => u.id === e.id)} name={e.name} to={`/profile/${e.id}`}/>
          }else{
            return <UsersCard key={e.id} id={e.id} btn={false} name={e.name} to={`/profile`}/>
          }
        })
      }
      {
        search && users.items && !users.items.length  && (
          <h3 className="text-center text-xl font-medium">No se encontraron coincidencias</h3>
        )
      }
    </Main>
  )
}