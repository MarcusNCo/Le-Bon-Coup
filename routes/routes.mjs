import {Router} from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index", {message: "Le Bon Coup"});
})
  routes.get("/formConnect", (req, res) => {
    res.render("formConnect", {message: ""});
})

export default routes;
