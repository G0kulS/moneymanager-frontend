import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import Frontpage from './Frontpage';
import Forgetpassword from './Forgetpassword';
import Resetpassword from './Resetpassword';
import Registry from './Register';
import { ProfileDetails } from './Profilecontext';
function App() {
  return <ProfileDetails>
   <Router>
    <Switch>
    <Route path="/" exact="true">
        <Frontpage></Frontpage>
      </Route>
      <Route path="/register" exact="true">
        <Registry></Registry>
      </Route>
      <Route path="/forgetpassword" exact="true">
        <Forgetpassword></Forgetpassword>
      </Route>
      <Route path="/resetpassword/:id" exact="true">
       <Resetpassword></Resetpassword>
      </Route>
      <Route path="/home" exact="true">
        <Home></Home>
      </Route>
      <Route path="/graph" exact="true">
        <Home></Home>
      </Route>
      <Route path="/profile" exact="true">
        <Home></Home>
      </Route>
      <Route path="/filter" exact="true">
        <Home></Home>
      </Route>
      <Route path="/edit" exact="true">
        <Home></Home>
      </Route>
      </Switch>
    </Router>
    </ProfileDetails>
}

export default App;
