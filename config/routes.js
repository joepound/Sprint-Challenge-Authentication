const axios = require("axios");
const bcrypt = require("bcryptjs");

const log = require("./log");
const validate = require("../errors/bodyValidator");
const sqlErrors = require("../errors/sqlErrorList");
const { authenticate } = require("../auth/authenticate");

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
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  const userData = req.body;
  userData.UserPassword = bcrypt.hashSync(userData.UserPassword, 12);

  console.log("Proceeding to register the new user...");
  try {
    //await registerUser
  } catch (err) {
    console.log;
  }
  dbHelper
    .registerUser(userData)
    .then(() => {
      res.status(201).json({
        success: true,
        message: `User ${userData.UserName} has been registered.`
      });
      console.log("User registration attempt finished.");
    })
    .catch(err => {
      sendError(res, 500, err);
      console.log("User registration attempt finished.");
    });
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
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
