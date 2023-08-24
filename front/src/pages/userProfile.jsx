import React from "react";
import Main from "../components/layout/Main";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";



export default function UserProfile(){
  var {auth} = useSelector(state => state) 
  return (
    <Main>
      <div className="flex justify-center gap-5 mt-4">
        <div>
          <h3 className="text-3xl">{auth.user.name}</h3>
          <span className="text-sm">{auth.user.email}</span>
        </div>
        <div className="flex gap-3">
          <Link to={`/followers`} className="flex flex-col justify-center items-center">
            <span className="text-xl">{auth.user.seguidoPor.length}</span>
            <span>Seguirdores</span>
          </Link>
          <Link to={`/follows`} className="flex flex-col justify-center items-center">
            <span className="text-xl">{auth.user.sigueA.length}</span>
            <span>Seguidos</span>
          </Link>
        </div>
      </div>
    </Main>
  )
}