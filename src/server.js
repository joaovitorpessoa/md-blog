const express = require("express");
const path = require("path");
const server = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const { routes } = require("./routes");
const { articleModel } = require("./models/article.model");

mongoose.connect("mongodb://localhost/blog");

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));

server.use(routes);

server.get("/", async (req, res) => {
  const articles = await articleModel.find().sort({
    createdAt: "desc",
  });
  res.render(path.join(__dirname, "views", "articles", "index"), { articles });
});

module.exports = { server };
