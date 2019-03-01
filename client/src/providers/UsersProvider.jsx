import React, { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext();

function UsersProvider(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [jokes, setJokes] = useState(null);

  const baseURL = "http://localhost:5000/api";
  // const baseURL = "https://joepound-ls-auth-sprint.herokuapp.com/api";
  const getAuthToken = () => ({
    headers: { Authorization: localStorage.getItem("token") }
  });
  const usersContext = {
    usernameInput,
    passwordInput,

    textInputSetters: {
      setUsernameInput,
      setPasswordInput
    },

    jokes,

    authenticate() {
      return axios.get(`${baseURL}/auth`, getAuthToken());
    },

    register(e) {
      e.preventDefault();

      if (!usernameInput) {
        alert("Please enter a username first.");
      } else if (!passwordInput) {
        alert("Please enter a password first.");
      } else {
        const userData = {
          UserName: usernameInput,
          UserPassword: passwordInput
        };
        axios
          .post(`${baseURL}/register`, userData)
          .then(res => {
            alert("User registration successful.");
            window.location.href = "/";
          })
          .catch(err => {
            alert("An error occurred in user registration.");
            console.log(err);
          });
      }
    },

    login(e) {
      e.preventDefault();

      if (!usernameInput) {
        alert("Please enter a username first.");
      } else if (!passwordInput) {
        alert("Please enter a password first.");
      } else {
        const userData = {
          UserName: usernameInput,
          UserPassword: passwordInput
        };
        axios
          .post(`${baseURL}/login`, userData)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            alert("Login was successful.");
            window.location.href = "/";
          })
          .catch(err => {
            alert("Login failed.");
            setJokes(null);
            console.log(err);
          });
      }
    },

    getJokes() {
      axios
        .get(`${baseURL}/jokes`, getAuthToken())
        .then(res => setJokes(res.data.data))
        .catch(err => {
          setJokes(null);
          console.log(err);
          alert("You must log in to view this content.");
          window.location.href = "/";
        });
    },

    logout() {
      localStorage.setItem("token", "");
      alert("Logout was successful.");
      window.location.href = "/";
    },

    handleTextInputChange(e) {
      usersContext.textInputSetters[e.currentTarget.name](
        e.currentTarget.value
      );
    },

    clearUserInfoForm(e) {
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
