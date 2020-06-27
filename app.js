// create an express app
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const auth = require("./auth.js");
const app = express();

app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);

app.use(bodyParser.urlencoded({ extended: false }));

auth(app);
routes(app);

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
