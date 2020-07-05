import React from "react";
import "./index.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Homepage, Header } from "./Component";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/login" name="Login" component={Homepage} />
          <Route path="/sign-up" name="SignUp" component={Homepage} />
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
