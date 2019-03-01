import React from "react";
import { Switch, Route } from "react-router-dom";

import { AppHeader } from "./components/AppHeader";

import { LoginPage } from "./views/Login";
import { RegistrationPage } from "./views/Registration";
import { JokelistPage } from "./views/Jokelist";
import { ErrorPage } from "./views/Error/";

function App(props) {
  return (
    <div className="jokelist">
      <AppHeader />
      <Switch>
        <Route exact path="/" render={props => <LoginPage {...props} />} />
        <Route
          exact
          path="/signin"
          render={props => <LoginPage {...props} />}
        />
        <Route
          exact
          path="/signup"
          render={props => <RegistrationPage {...props} />}
        />
        <Route
          exact
          path="/jokes"
          render={props => <JokelistPage {...props} />}
        />
        <Route path="*" render={props => <ErrorPage {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
