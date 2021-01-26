const express = require("express");
const api = express.Router();
const Joi = require("joi");
const Api = require("../models/Api");
// import axios from "axios";

//Function for validation
function validateCourse(newsData) {
  const schema = Joi.object({
    author: Joi.string().min(3),
    title: Joi.string().min(10),
    description: Joi.string().min(10),
    url: Joi.disallow(),
    urlToImage: Joi.allow(),
    publishedAt: Joi.allow(),
    content: Joi.string().min(10),
  });
  return schema.validate(newsData);
}

//Routes

api.get("/", async (req, res) => {
  res.send("Hello From API");
});
api.get("/news", async (req, res) => {
  const newsData = await Api.find();
  res.json(newsData);
});

//Adding News using Post method
api.post("/news/post", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newNews = new Api(req.body);
  const savedNews = await newNews.save();
  res.json(savedNews);
});
//Removing using delete method
api.delete("/news/delete/:id", async (req, res) => {
  const del = await Api.findByIdAndDelete({ _id: req.params.id });
  res.json(del);
});
//Updating using Patch method. To use must provide _id & content to update
api.patch("/news/patch/:id", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = await Api.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(update);
});

module.exports = api;
