import {Router} from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index", {message: "Bienvenue sur Le Bon Coup"});
})

export default routes;