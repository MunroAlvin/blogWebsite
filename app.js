//jshint esversion:6
// const variables
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// init express.js
const express = require("express");
const app = express();
const port = 3000;

// init bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

//init ejs
const ejs = require("ejs");
const {
  text
} = require("body-parser");
app.set("view engine", "ejs");

//init static folder
app.use(express.static(__dirname + "/public"));

// Load the full build of lodash.
const _ = require('lodash');

// init mongoose
const mongoose = require('mongoose');

// // open a connection to the "blogDB" database on our locally
mongoose.connect('mongodb://localhost:27017/test', function (error) {
  if (!error) {
    console.log("Database created succesfully Database name is: blogDB");
  } else {
    console.log(error);
  }
});

// const blogSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });


// variables
let posts = [];


app.get("/", function (req, res) {
  res.render('home', {
    homeStartingContent: homeStartingContent,
    posts: posts
  });

});

app.get("/home/:postName", function (req, res) {


  function isSearchedPostName(obj) {

    obj.title = _.lowerCase(obj.title);

    req.params.postName = _.lowerCase(req.params.postName);
   
    return obj.title === req.params.postName;
  }

  if (posts.find(isSearchedPostName) == undefined) {
    console.log("no");
    res.render('post', {
      postTitle: "Undefined page",
      postContent: "Munro Alvin"
    });
  } else {
    console.log("ok");
    res.render('post', {
      postTitle:   posts.find(isSearchedPostName).title,
      postContent: posts.find(isSearchedPostName).content
    });

  }


});

app.get("/about", function (req, res) {
  res.render('about', {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render('contact', {
    contactContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render('compose', {

  });
});

app.post("/compose", function (req, res) {

  const post = {

    title: req.body.postTitle,
    content: req.body.postBody

  };

  posts.push(post);

  res.redirect("/");

});


app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Example app listening on port ${port}`);
});