const axios = require("axios");
const bcrypt = require("bcryptjs");

const log = require("./log");
const validate = require("../errors/bodyValidator");
const sqlErrors = require("../errors/sqlErrorList");
const { authenticate } = require("../auth/authenticate");

const db = require("../database/dbConfig");

module.exports = server => {
  server.post(
    "/api/register",
    log(log().regStart).start,
    validate(...log().regVal).userCredentials,
    register
  );
  server.post(
    "/api/login",
    log(log().loginStart).start,
    validate(...log().loginVal).userCredentials,
    login
  );
  server.get("/api/jokes", log(log().jokeStart).start, authenticate, getJokes);
};

async function register(req, res) {
  const userData = req.body;
  userData.UserPassword = bcrypt.hashSync(userData.UserPassword, 12);

  console.log("Proceeding to register the new user...");
  try {
    await db("Users").insert(userData);
    res.status(201).json({
      success: true,
      data: { message: "User was successfully registered." }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      code: 500,
      errorInfo: err.errno ? sqlErrors[err.errno] : err.toString()
    });
    console.log("User registration attempt finished.");
  }
}

async function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json({
        success: true,
        data: response.data.results
      });
      console.log("Finished attempt on fetching Jokes");
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        code: 500,
        errorInfo: err.errno ? sqlErrors[err.errno] : err.toString()
      });
      console.log("Finished attempt on fetching Jokes");
    });
}
