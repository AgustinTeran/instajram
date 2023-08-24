import React from "react";
import { ToastContainer } from "../../config/notify";


export default function Main({children,...rest}){
  return (
    <main className={`pb-20 pt-2 min-h-screen max-w-4xl mx-auto ${rest.className}`}>
      <ToastContainer/>
      {
        children
      }
    </main>
  )
}