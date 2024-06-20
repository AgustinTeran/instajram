// import React, { useEffect, useState } from "react";
import "./assets/styles/index.scss";
// import {useDispatch, useSelector} from "react-redux"
// import authActions from "./redux/auth/actions"
// import BigLoader from "./components/commons/bigLoader";
// import 'react-toastify/dist/ReactToastify.css';
// import UsersRoutes from "./routes/UsersRoutes";
// import { onConect } from "./socket.io";
import antes from "./assets/videos/antesWebM.webm";
import despues from "./assets/videos/despuesWebM.webm";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";





function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 py-8">
      <a href="https://instajram.pages.dev/" className="underline text-blue-500 text-3xl font-medium text-center hover:text-orange-500">
        <span>Se remodeló la página para tener chats en tiempo real</span>
        <FaArrowUpRightFromSquare className="h-5 w-5 inline ml-3 mb-1"/>
      </a>
      <div className="flex gap-8 flex-wrap px-1">
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
          <h3 className="text-xl font-semibold">Antes</h3>
          <video className="min-w-[350px] h-auto aspect-auto" src={antes} autoPlay muted loop></video>
        </div>
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
          <h3 className="text-xl font-semibold">Ahora</h3>
          <video className="min-w-[350px] h-auto aspect-auto" src={despues} autoPlay muted loop></video>
        </div>
      </div>
    </div>
  );
}

export default App;
