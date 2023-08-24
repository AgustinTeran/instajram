import React, { useEffect } from "react";
import Main from "../components/layout/Main";
import FollowersNav from "../components/customs/followersNav";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import BigLoader from "../components/commons/bigLoader";
import userActions from "../redux/users/actions"
import UsersCard from "../components/customs/usersCard";





export default function Followers(){
  var {id} = useParams()
  var {current: user} = useSelector(state => state.users)
  var {auth} = useSelector(state => state)
  var history = useHistory()
  var dispatch = useDispatch()

  useEffect(() => {
    if(id === auth.user.id) return history.push("/followers")
    if(user.item?.id !== id) dispatch(userActions.get(id))
  },[])

  if(user.loading || !user.item){
    return (
      <BigLoader/>
    )
  }
  
  return (
    <Main>
      <FollowersNav id={user.item.id} name={user.item.name}/>
      <div className="max-w-[525px] mx-auto">
        {
          user.item.seguidoPor.map(e => {
            if(e.id !== auth.user.id){
              return <UsersCard key={e.id} id={e.id} btnFollow={!auth.user.sigueA.find(u => u.id === e.id)} name={e.name} to={`/profile/${e.id}`}/>
            }else{
              return <UsersCard key={e.id} id={e.id} btn={false} name={e.name} to={`/profile`}/>
            }
          })
        }
      </div>
    </Main>
  )
}