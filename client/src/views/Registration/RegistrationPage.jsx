import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../providers/UsersProvider";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function RegistrationPage(props) {
  document.title = "Sign Up - Jokelist";

  const { register } = useContext(UsersContext);

  return (
    <main className="jokelist__registration">
      <AccountInfoForm {...props} action={register} submit="Register" />
      <div className="jokelist__registration__login-link">
        <Link to="/">Back to login</Link>
      </div>
    </main>
  );
}

export default RegistrationPage;
