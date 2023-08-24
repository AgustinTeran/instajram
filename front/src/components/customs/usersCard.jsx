import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {useDispatch, useSelector} from "react-redux"
import userActions from "../../redux/users/actions"



export default function UsersCard({id,name,to,btn=true,btnFollow}){
  var dispatch = useDispatch()
  var {auth} = useSelector(state => state)
  return (
    <div className="flex justify-between items-center p-2">
      <Link className="flex-1" to={to}>
        <span className="text-lg">{name}</span>
      </Link>
      {
        btn && (btnFollow? (
          <button onClick={() => dispatch(userActions.follow(auth.user.id,auth.user.name,id,name))} className="btn btn-secondary btn-sm">Seguir</button>
        ) : (
          <button onClick={() => dispatch(userActions.unFollow(auth.user.id,id))} className="btn btn-secondary btn-sm">Dejar de seguir</button>
        ))
      }
    </div>
  )
}