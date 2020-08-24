import React from "react";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { isLogin } from "./helpers/cookie";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getStorage } from "./helpers/localStorage";
import {
  Homepage,
  Header,
  Login,
  Signup,
  List_account,
  Transfer,
  ForgotPassword,
  User_Management,
  Change_password,
} from "./Component";

function App() {
  const user = getStorage("user");
  return (
    <div>
      <BrowserRouter>
        <Header />
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
          <Route path="/" exact name="Home" component={Homepage} />
          <PrivateRoute path="/transfer" exact component={Transfer} />
          <PrivateRoute path="/account" exact component={List_account} />
          <PrivateRoute
            path="/user/changePassword"
            exact
            component={Change_password}
          />
          <AdminRoute
            path="/user-management"
            exact
            restricted={user && user.role === "staff"}
            component={User_Management}
          />
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
