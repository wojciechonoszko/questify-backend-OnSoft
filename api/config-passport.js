const passport = require("passport");
const jwt = require("jsonwebtoken");

const passportJWT = require('passport-jwt');
const User = require("../service/schemas/user");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const secret = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}
passport.use(
  new Strategy(params, function (payload, done) {

    User.findOne({ _id: payload._id }).then((user) => {
    if (!user) {
      return done(new Error("User not found!"));
    }
    return done(null,user)
  })
    .catch((e) => {
    done(e)
  })
  
})
)
