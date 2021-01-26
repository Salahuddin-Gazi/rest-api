const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Create Express App
const app = express();
//Middleware
app.use(bodyParser.json());

//Database
mongoose.connect("mongodb://localhost/news", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB database....");
});

const news = [
  {
    id: 1,
    title: "News No 1.",
    author: "Holy Moly 1",
    publishedAt: "Date 1",
    image: "",
    content: "News No 1's content.",
    description: "News No 1 description",
  },

  {
    id: 2,
    title: "News No 2.",
    author: "Holy Moly 2",
    publishedAt: "Date 2",
    image: "",
    content: "News No 2's content.",
    description: "News No 2 description",
  },

  {
    id: 3,
    title: "News No 3.",
    author: "Holy Moly 3",
    publishedAt: "Date 3",
    image: "",
    content: "News No 3's content.",
    description: "News No 3 description",
  },

  {
    id: 4,
    title: "News No 4.",
    author: "Holy Moly 4",
    publishedAt: "Date 4",
    image: "",
    content: "News No 4's content.",
    description: "News No 4 description",
  },

  {
    id: 5,
    title: "News No 5.",
    author: "Holy Moly 5",
    publishedAt: "Date 5",
    image: "",
    content: "News No 5's content.",
    description: "News No 5 description",
  },
];

//Function for validation
function validateCourse(newsData) {
  const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3),
    publishedAt: Joi.string().min(3),
    image: Joi.string(),
    content: Joi.string().min(3),
    description: Joi.string().min(3),
  });
  return schema.validate(newsData);
}

//Middlewares>> this creates middle term situation btween Routes, #EzPZ
// app.use("/posts", () => {
//   console.log("This is a Middleware Running Befor Posts");
// });

//Routes
//get for get the information
app.get("/", (req, res) => {
  res.send("Hola Mi Hija");
});

//Another Route
app.get("/api/news", (req, res) => {
  res.send(news);
});

app.get("/api/news/:id", (req, res) => {
  const newsData = news.find((c) => c.id === parseInt(req.params.id));

  if (!newsData)
    return res.status(404).send(`News Not Found with ID:${req.params.id}`);

  res.send(newsData);
});

//Post for creating data
app.post("/api/news", (req, res) => {
  const { error } = validateCourse(req.body);

  const newsData = {
    id: news.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedAt: req.body.publishedAt,
    image: req.body.image,
    content: req.body.content,
    description: req.body.description,
  };
  if (error) return res.status(400).send(error.details[0].message);
  res.send(newsData);
  news.push(newsData);
});
app.post("/api/news/:id", (req, res) => {
  const { error } = validateCourse(req.body);

  const newsData = {
    id: parseInt(req.params.id),
    title: req.body.title,
    author: req.body.author,
    publishedAt: req.body.publishedAt,
    image: req.body.image,
    content: req.body.content,
    description: req.body.description,
  };
  if (error) return res.status(400).send(error.details[0].message);
  res.send(newsData);
  news.push(newsData);
});

//Put for updating data >>{
app.put("/api/news/:id", (req, res) => {
  //Look up the data
  //If not Existing, return 404
  const newsData = news.find((c) => c.id === parseInt(req.params.id));
  //prettier-ignore
  if (!newsData) return res.status(404).send(`News Not Found with ID:${req.params.id}`);

  //Validate
  //If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // return;

  //Update Data
  // newsData = {
  //   // id: req.body.title,
  //   title: req.body.title,
  //   author: req.body.author,
  //   publishedAt: req.body.publishedAt,
  //   image: req.body.image,
  //   content: req.body.content,
  //   description: req.body.description,
  // };
  newsData.title = req.body.title;
  newsData.author = req.body.author;
  newsData.publishedAt = req.body.publishedAt;
  newsData.image = req.body.image;
  newsData.content = req.body.content;
  newsData.description = req.body.description;

  //Return the update data
  res.send(newsData);

  // }
});

//delete to remove a post>>{
app.delete("/api/news/:id", (req, res) => {
  //Look up the data
  //If not Existing, return 404
  const newsData = news.find((c) => c.id === parseInt(req.params.id));

  if (!newsData)
    return res.status(404).send(`News Not Found with ID:${req.params.id}`);

  //delete
  const index = news.indexOf(newsData);
  news.splice(index, 1);

  //Return the same course
  res.send(newsData);

  // }
});

//how to start up the server
// const port = process.env.PORT;

const port = 5000 || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...!`));
