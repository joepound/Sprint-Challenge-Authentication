import React from "react";
import { Route } from "react-router-dom";

import { AppHeader } from "./components/AppHeader";

// import { LoginPage } from "./views/Login";
// import { RegistrationPage } from "./views/Registration";
// import { UserlistPage } from "./views/Userlist";

function App(props) {
  return (
    <div className="jokelist">
      <AppHeader />
      {/* <Route exact path="/" render={props => <LoginPage {...props} />} />
      <Route exact path="/signin" render={props => <LoginPage {...props} />} />
      <Route
        exact
        path="/signup"
        render={props => <RegistrationPage {...props} />}
      />
      <Route
        exact
        path="/users"
        render={props => <UserlistPage {...props} />}
      /> */}
    </div>
  );
}

export default App;
