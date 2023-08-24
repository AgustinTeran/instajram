import React, { useEffect } from "react";
import Main from "../components/layout/Main"
import BigLoader from "../components/commons/bigLoader"
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import userActions from "../redux/users/actions"
import { useDispatch, useSelector } from "react-redux";



export default function Profile(){
  var {id} = useParams()
  var dispatch = useDispatch()
  var {current: user} = useSelector(state => state.users)
  var {auth} = useSelector(state => state)
  var history = useHistory()

  useEffect(() => {
    if(id === auth.user?.id) return history.push("/profile")
    if(user.item?.id !== id) dispatch(userActions.get(id))
  },[])

  if(user.loading || !user.item){
    return (
      <BigLoader/>
    )
  }

  return (
    <Main>
      <div className="flex justify-center gap-5 mt-4">
        <div>
          <h3 className="text-3xl">{user.item.name}</h3>
          <span className="text-sm">{user.item.email}</span>
        </div>
        <div className="flex gap-3">
          <Link to={localStorage.getItem("token")? `/followers/${user.item.id}` : `/profile/${user.item.id}`} className="flex flex-col justify-center items-center">
            <span className="text-xl">{user.item.seguidoPor.length}</span>
            <span>Seguirdores</span>
          </Link>
          <Link to={localStorage.getItem("token")? `/follows/${user.item.id}` : `/profile/${user.item.id}`} className="flex flex-col justify-center items-center">
            <span className="text-xl">{user.item.sigueA.length}</span>
            <span>Seguidos</span>
          </Link>
        </div>
      </div>
      {
        user.item.seguidoPor.find(e => e.id === auth.user?.id) && (
          <div className="flex justify-center mt-5 px-2">
            <button onClick={() => dispatch(userActions.unFollow(auth.user.id,user.item.id))} className="btn btn-sm btn-secondary max-w-[360px] w-full">Dejar de Seguir</button>
          </div>
        )
      }
      {
        localStorage.getItem("token") && !user.item.seguidoPor.find(e => e.id === auth.user?.id) && (
          <div className="flex justify-center mt-5 px-2 ">
            <button onClick={() => dispatch(userActions.follow(auth.user.id,auth.user.name,user.item.id,user.item.name))} className="btn btn-sm btn-secondary max-w-[360px] w-full">Seguir</button>
          </div>
        )
      }
      
    </Main>
  )
}