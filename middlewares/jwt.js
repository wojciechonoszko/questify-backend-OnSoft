const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
  
    if (!user || err) {
        console.log(err);
      return res.status(401).json({ message: "Unauthorized!" });
    }
    res.locals.user = user;
    next();
  })(req, res, next);
};
module.exports = authMiddleware;