const path = require("path");
const { Router } = require("express");

const { articleModel } = require("../models/article.model");

const articleRoutes = Router();

articleRoutes.get("/new", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "articles", "new"), {
    article: new articleModel(),
  });
});

articleRoutes.get("/:slug", async (req, res) => {
  const article = await articleModel.findOne({ slug: req.params.slug });
  if (!article) res.redirect("/");
  res.render(path.join(__dirname, "..", "views", "articles", "show"), {
    article,
  });
});

articleRoutes.delete("/:id", async (req, res) => {
  await articleModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

articleRoutes.get("/edit/:id", async (req, res) => {
  const article = await articleModel.findById(req.params.id);
  res.render(path.join(__dirname, "..", "views", "articles", "edit"), {
    article,
  });
});

articleRoutes.post(
  "/",
  (req, res, next) => {
    const { title, description, markdown } = req.body;
    req.article = new articleModel({ title, description, markdown });
    next();
  },
  saveArticleAndRedirect("new")
);

articleRoutes.put(
  "/:id",
  async (req, res, next) => {
    const { title, description, markdown } = req.body;
    const article = await articleModel.findById(req.params.id);
    Object.assign(article, { title, description, markdown });
    req.article = article;
    next();
  },
  saveArticleAndRedirect("edit")
);

function saveArticleAndRedirect(redirectPath) {
  return async (req, res) => {
    let article = req.article;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.error(error.message);
      res.render(
        path.join(__dirname, "..", "views", "articles", `${redirectPath}`),
        { article }
      );
    }
  };
}

module.exports = { articleRoutes };
