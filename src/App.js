import React from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Homepage, Header, Login, Signup, Profile, List_account, Transaction, Transfer, ForgotPassword, Change_password } from "./Component";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login" name="Login" component={Login} />
          <Route path="/register" name="Register" component={Signup} />
          <Route path="/" name="Home" component={Homepage} />
          <Route
            exact
            path="/"
            name="Home"
            render={() => <Redirect to="/login" />}
          />
          <Route path="/profile" name="Profile" component={Profile} />
          <Route path="/account" component={List_account} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
