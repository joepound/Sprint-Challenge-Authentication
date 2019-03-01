import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../providers/UsersProvider";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function LoginPage(props) {
  document.title = "Sign In - Jokelist";

  const { authenticate, login } = useContext(UsersContext);

  useEffect(() => {
    if (authenticate()) {
      alert("success!");
      window.location.href = "/jokes";
    }
  }, []);

  return (
    <main className="jokelist__login">
      <AccountInfoForm {...props} action={login} />
      <div className="jokelist__login__register-link">
        Not logged in? Sign up <Link to="/signup">here</Link>.
      </div>
    </main>
  );
}

export default LoginPage;
