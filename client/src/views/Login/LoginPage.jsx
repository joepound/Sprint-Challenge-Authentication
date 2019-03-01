import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../providers/UsersProvider";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function LoginPage(props) {
  document.title = "Sign In - Jokelist";

  const { authenticate, login } = useContext(UsersContext);

  useEffect(() => {
    authenticate()
      .then(res => (window.location.href = "/jokes"))
      .catch(err => console.log(err.toString()));
  }, []);

  return (
    <main className="jokelist__login">
      <AccountInfoForm {...props} action={login} submit="Log In" />
      <div className="jokelist__login__register-link">
        Not logged in? Sign up <Link to="/signup">here</Link>.
      </div>
    </main>
  );
}

export default LoginPage;
