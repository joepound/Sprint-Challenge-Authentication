import React, { useContext, useEffect } from "react";

import { UsersContext } from "../../providers/UsersProvider";

function AccountInfoForm(props) {
  const {
    usernameInput,
    passwordInput,
    handleTextInputChange,
    clearUserInfoForm
  } = useContext(UsersContext);

  let pageName;
  switch (props.location.pathname) {
    case "/":
    case "/signin":
      pageName = "Login";
      break;
    case "/signup":
      pageName = "Register";
      break;
    default:
      pageName = "User Info Form";
  }

  useEffect(() => {
    clearUserInfoForm();
  }, []);

  return (
    <form className="jokelist__account-info-form" onSubmit={props.action}>
      <h2 className="jokelist__account-info-form__heading">{pageName}</h2>
      <div className="jokelist__account-info-form__field">
        <label
          className="jokelist__account-info-form__field__label"
          htmlFor="UserName"
        >
          Username:{" "}
        </label>
        <input
          className="jokelist__account-info-form__field__input"
          id="UserName"
          type="text"
          placeholder="Enter username"
          required
          name="setUsernameInput"
          value={usernameInput}
          onChange={handleTextInputChange}
        />
      </div>
      <div className="jokelist__account-info-form__field">
        <label
          className="jokelist__account-info-form__field__label"
          htmlFor="UserPassword"
        >
          Password:{" "}
        </label>
        <input
          className="jokelist__account-info-form__field__input"
          id="UserPassword"
          type="password"
          placeholder="Enter password"
          required
          name="setPasswordInput"
          value={passwordInput}
          onChange={handleTextInputChange}
        />
      </div>
      <div className="jokelist__account-info-form__buttons">
        <button
          className="jokelist__account-info-form__buttons__submit"
          type="submit"
        >
          {props.submit || "Submit"}
        </button>
        <button
          className="jokelist__account-info-form__buttons__clear"
          type="reset"
          onClick={clearUserInfoForm}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default AccountInfoForm;
