const axios = require("axios");
const bcrypt = require("bcryptjs");

const log = require("./log");
const validate = require("../errors/bodyValidator");
const sqlErrors = require("../errors/sqlErrorList");
const { genToken, authenticate } = require("../auth/authenticate");

const db = require("../database/dbConfig");

module.exports = server => {
  server.get(
    "/api/auth",
    authenticate,
    (req, res) => res.sendStatus(204)
  );

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

// Login token currently set to expire in 1 minute
async function login(req, res) {
  const userData = req.body

  console.log("Retrieving user information records...");
  try {
    const userMatch = await db("Users").where({ UserName: userData.UserName }).first();

    console.log("Checking if user exists...");
    if (userMatch) {
      console.log("Checking if correct password was supplied...");
      if (bcrypt.compareSync(userData.UserPassword, userMatch.UserPassword)) {
        console.log("Setting up token...");
        const token = await genToken(userMatch);

        res.status(200).json({
          success: true,
          message: `Login for user ${userData.UserName} was successful.`,
          token
        });
      } else {
        res.status(401).json({
          success: false,
          code: 500,
          errorInfo: "Invalid credentials."
        });
      }
    } else {
      res.status(401).json({
        success: false,
        code: 500,
        errorInfo: "Invalid credentials."
      });
    }

    console.log("User login attempt finished.");
  } catch (err) {
    res.status(500).json({
      success: false,
      code: 500,
      errorInfo: err.errno ? sqlErrors[err.errno] : err.toString()
    });
    console.log("User login attempt finished.");
  }
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
