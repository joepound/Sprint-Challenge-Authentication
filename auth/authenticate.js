const jwt = require("jsonwebtoken");

const jwtKey =
  process.env.JWT_SECRET || "JWT"

// quickly see what this file exports
module.exports = {
  genToken,
  authenticate
};

function genToken(user) {
  const payload = {
    subject: user.UserID,
    username: user.UserName,
    department: user.UserDepartment
  };
  const secret = process.env.JWT_SECRET || "JWT";
  const options = {
    expiresIn: 60
  };
  
  return new Promise(function(res, rej) {
    const retFunc = function(err, token) {
      return err ? rej(err) : res(token);
    };
    return jwt.sign(payload, secret, options, retFunc);
  });
}

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        console.log("Access denied.");
        return res.status(401).json(err);
      }

      req.decoded = decoded;

      next();
    });
  } else {
    console.log("Access denied.");
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}
