const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Create Express App
const app = express();

//Database
//prettier-ignore
mongoose.connect('mongodb://localhost/news', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB Connected Yo!");
});

//Middleware
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hola Mi Hija");
});

//News Routes
const NewsRoute = require("./routes/Api");
app.use("/api", NewsRoute);

//how to start up the server
// const port = process.env.PORT;

const port = 5000 || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...!`));
