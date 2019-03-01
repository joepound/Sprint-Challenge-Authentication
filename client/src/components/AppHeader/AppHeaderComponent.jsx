import React from "react";

function AppHeader(props) {
  return (
    <header className="jokelist__app-header">
      <img
        className="jokelist__app-header__app-logo"
        src="images/logo.png"
        alt="Userlist logo"
      />
      <h1 className="jokelist__app-header__app-name">Jokelist</h1>
    </header>
  );
}

export default AppHeader;
