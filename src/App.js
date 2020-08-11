import React from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  Homepage,
  Header,
  Login,
  Signup,
  Profile,
  List_account,
  Transaction,
  Transfer,
  ForgotPassword,
  Change_password,
} from "./Component";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Profile />
        <Switch>
          <Route path="/login" exact name="Login" component={Login} />
          <Route path="/register" exact name="Register" component={Signup} />
          <Route path="/" exact name="Home" component={Homepage} />
          <Route exact path="/" name="Home" />
          <Route path="/account" exact component={List_account} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
