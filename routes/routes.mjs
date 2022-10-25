import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index", { message: "Le Bon Coup" });
});

routes.get("/singleProduct", (req, res) => {
  res.render("singleProduct");
});

export default routes;
