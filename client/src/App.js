import {Route} from "react-router-dom"
import Inicio from './components/inicio';
import Singin from './components/signIn';
import Login from './components/login';
import Nav from './components/nav';
import SigueA from './components/sigueA';
import SeguidoPor from './components/seguidoPor';
import Profile from './components/perfil';
import Search from "./components/search";

function App() {
  return (
    <>
      <Route exact path={"/"}>
        <Inicio/>
      </Route>
      <Route exact path={"/search"}>
        <Search/>
      </Route>
      {
        localStorage.token?
        <>
        <Route exact path={"/profile/:username"}>
          <Profile/>
        </Route>
        <Route exact path={"/seguidos/:username"}>
          <SigueA/>
        </Route>
        <Route exact path={"/seguidores/:username"}>
          <SeguidoPor/>
        </Route>
        </>
          : <>
          <Route path={"/login"}>
            <Login/>
          </Route>
          <Route path={"/singin"}>
            <Singin/>
          </Route>
          </>
      }
       <Route path={"/"}>
        <Nav/>
      </Route>
    </>
  );
}

export default App;
