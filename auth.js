const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = { username: "admin", password: process.env.PASSWORD, id: 01 };

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(null, User);
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      if (username !== User.username) {
        console.log("incorrect username");
        return done(null, false);
      }
      if (password !== User.password) {
        console.log("incorrect password");
        return done(null, false);
      }
      return done(null, User);
    })
  );
};
