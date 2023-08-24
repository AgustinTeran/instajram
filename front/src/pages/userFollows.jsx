import React from "react";
import Main from "../components/layout/Main";
import FollowersNav from "../components/customs/followersNav";
import { useSelector } from "react-redux";
import UsersCard from "../components/customs/usersCard";





export default function UserFollows(){
  var {auth} = useSelector(state => state)
 
  return (
    <Main>
      <FollowersNav name={auth.user.name}/>
      <div className="max-w-[525px] mx-auto">
        {
          auth.user.sigueA.map(e => {
            return <UsersCard key={e.id} id={e.id} name={e.name} to={`/profile/${e.id}`}/>
          })
        }
      </div>
    </Main>
  )
}