import React from "react";
import Main from "../components/layout/Main";
import FollowersNav from "../components/customs/followersNav";
import { useSelector } from "react-redux";
import UsersCard from "../components/customs/usersCard";





export default function UserFollowers(){
  var {auth} = useSelector(state => state)
 
  return (
    <Main>
      <FollowersNav name={auth.user.name}/>
      <div className="max-w-[525px] mx-auto">
        {
          auth.user.seguidoPor.map(e => {
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