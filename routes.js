const passport = require("passport");
const express = require("express");

module.exports = (app) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      console.log("not logged in");
      res.redirect("/");
    }
  }

  app.route("/").get(function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  // define the first route
  app.route("/heartbeat").get(function (req, res) {
    res.send("<3");
  });

  app.route("/login").post(
    passport.authenticate("local", {
      successRedirect: "/prototype",
      failureRedirect: "/",
    })
  );

  app.use(
    "/prototype",
    ensureAuthenticated,
    express.static("public/prototype")
  );

  app.route("/logout").get(function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/");
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
