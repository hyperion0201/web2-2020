import React, { Component } from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { isLogin } from "./helpers/cookie";
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
} from "./Component";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Profile />
        <Switch>
          <PublicRoute path="/login" exact name="Login" component={Login} />
          <PublicRoute
            path="/register"
            exact
            name="Register"
            component={Signup}
          />
          <PublicRoute
            path="/forgot-password"
            exact
            component={ForgotPassword}
          />
          <PrivateRoute path="/" exact name="Home" component={Homepage} />
          <PrivateRoute path="/transaction" exact component={Transaction} />
          <PrivateRoute path="/transfer" exact component={Transfer} />
          <PrivateRoute path="/account" exact component={List_account} />
          <Route path="*">
            <div className="page-404">
              <img src="/images/frame.png" alt="" />
              <h3>Page Not Found</h3>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const AdminRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          restricted ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;
