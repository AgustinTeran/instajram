import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "../components/layout/Nav";
import Home from "../pages/home";
import { useSelector } from "react-redux";
import Search from "../pages/search";
import Profile from "../pages/profile";
import UserProfile from "../pages/userProfile";
import Followers from "../pages/followers";
import Follows from "../pages/follows";
import UserFollows from "../pages/userFollows";
import UserFollowers from "../pages/userFollowers";
import Chats from "../pages/chats";
import Chat from "../pages/chat";




export default function UsersRoutes({theme,setTheme,auth}){

  if(localStorage.token){
    return (
      <Switch>
        <Route exact path={"/"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Home/>
        </Route>
        <Route exact path={"/search"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Search/>
        </Route>
        <Route exact path={"/profile/:id"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Profile/>
        </Route>
        <Route exact path={"/profile"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <UserProfile/>
        </Route>
        <Route exact path={"/follows/:id"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Follows/>
        </Route>
        <Route exact path={"/followers/:id"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Followers/>
        </Route>
        <Route exact path={"/followers"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <UserFollowers/>
        </Route>
        <Route exact path={"/follows"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <UserFollows/>
        </Route>
        <Route exact path={"/chats"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Chats/>
        </Route>
        <Route exact path={"/chat/:id"}>
          <Nav setTheme={setTheme} theme={theme}/>
          <Chat />
        </Route>
        <Route path={"*"} >
          <Redirect to={"/"}/>
        </Route>
      </Switch>
    )
  }
  return (
    <>
    <Switch>
      <Route exact path={"/"}>
        <Nav setTheme={setTheme} theme={theme}/>
        <Home/>
      </Route>
      <Route exact path={"/search"}>
        <Nav setTheme={setTheme} theme={theme}/>
        <Search/>
      </Route>
      <Route exact path={"/profile/:id"}>
        <Nav setTheme={setTheme} theme={theme}/>
        <Profile/>
      </Route>
      <Route path={"*"} >
        <Redirect to={"/"}/>
      </Route>
    </Switch>
    {/* <Redirect to={"/"}/> */}
  </>
  )
}