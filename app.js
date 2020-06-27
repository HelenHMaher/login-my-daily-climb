// create an express app
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongo = require("mongodb").MongoClient;
const routes = require("./routes.js");
const auth = require("./auth.js");
const app = express();

app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);

app.use(bodyParser.urlencoded({ extended: false }));

mongo.connect(process.env.MONGO_URI, (err, client) => {
  let db = client.db("myproject");
  if (err) {
    console.log("Database err: " + err);
  } else {
    console.log("Successful database connection");

    auth(app, db);
    routes(app, db);

    // start the server listening for requests
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server is running...")
    );
  }
});
