import React, { useEffect } from "react";



export default function Select({input,meta,options,title,...rest}){
  return (
    <div className={`p-2 ${rest.className}`}>
      <label className="label">
        <span className="label-text text-base">{rest.label}</span>
      </label>
      <select {...input} className="select select-bordered w-full">
        <option hidden>{title}</option>
        {
          options.map(e => (
            <option key={e.value} value={e.value}>{e.name}</option>
          )
          )
        }
      </select>
    </div>
  )
}