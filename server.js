// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var db = require('./db');
var useRoute = require('./routes/books.route');
var useRoute1 = require('./routes/users.route');
var useRoute2 = require('./routes/transactions.route');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));

app.set("view engine", "pug"); // register the template engine
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use("/books",useRoute);
app.use("/users",useRoute1);
app.use("/transactions",useRoute2)

// https://expressjs.com/en/starter/basic-routing.html
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
