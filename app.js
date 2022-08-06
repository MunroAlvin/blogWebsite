//jshint esversion:6

// init express.js
const express = require("express");
const app = express();
const port = 3000;

// init bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//init ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
res.send("Hello from Munro's Blog");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });