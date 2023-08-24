import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi"
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";


export default function FollowersNav({id,name}){

  return (
    <div className="border-b-[1.7px] border-base-300 max-w-[525px] mx-auto py-3">
      <div className="flex gap-5 items-center">
        <Link to={id? `/profile/${id}` : `/profile`}><BiLeftArrowAlt className="h-9 w-9"/></Link>
        <h4 className="text-2xl font-bold">{name}</h4>
      </div>
      <div className="flex justify-evenly mt-4">
        <NavLink className="text-lg opacity-40" to={id? `/followers/${id}` : `/followers`}>Seguidores</NavLink>
        <NavLink className="text-lg opacity-40" to={id? `/follows/${id}` : `/follows`}>Seguidos</NavLink>
      </div>
    </div>
  )
}