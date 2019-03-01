module.exports = function(checkMsg, errorExitMsg) {
  return {
    userCredentials(req, res, next) {
      const userData = req.body;

      console.log(checkMsg);
      if (!userData.UserName) {
        res.status(400).json({
          success: false,
          code: 400,
          errorInfo: "Username not supplied."
        });
        console.log(errorExitMsg);
      } else if (!userData.UserPassword) {
        res.status(400).json({
          success: false,
          code: 400,
          errorInfo: "Password not supplied."
        });
        console.log(errorExitMsg);
      } else {
        next();
      }
    }
  };
};
