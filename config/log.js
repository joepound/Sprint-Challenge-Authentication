module.exports = function(msg) {
  return {
    start(req, res, next) {
      console.log(msg);
      next()
    },

    regStart: "\nAttempting to register new user...",
    loginStart: "\nAttempting login...",

    regVal: [
      "Checking if all required fields for registration were supplied...",
      "User registration attempt finished."
    ],
    loginVal: [
      "Checking if all required fields for login were supplied...",
      "User login attempt finished."
    ]
  };
};
