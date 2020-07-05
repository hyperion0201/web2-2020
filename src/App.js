import React from "react";
import "./index.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Homepage, Header, Login, Signup, CreateAccount } from "./Component";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login" name="Login" component={Login} />
          <Route path="/register" name="Register" component={Signup} />
          {/* <Route
            exact
            path="/"
            name="Home"
            render={() => <Redirect to="/login" />}
          /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
