const { Router } = require("express");
const { articleRoutes } = require("./articles.routes");

const routes = Router();

routes.use("/articles", articleRoutes);

module.exports = { routes };
