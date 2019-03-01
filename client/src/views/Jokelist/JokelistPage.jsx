import React, { useContext, useEffect } from "react";

import { UsersContext } from "../../providers/UsersProvider";

function JokelistPage(props) {
  document.title = "Ye Olde Jokez"

  const { jokes, getJokes, logout } = useContext(UsersContext);

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <main className="jokelist__container">
      <section className="jokelist__container__list">
        {jokes && jokes.map((joke, i) => (
            <p className="jokelist__container__list__item" key={joke.id}>
              "{joke.joke}"
            </p>
          ))}
      </section>
      <button className="jokelist__container__logout-btn" onClick={logout}>Log Out</button>
    </main>
  );
}

export default JokelistPage;
