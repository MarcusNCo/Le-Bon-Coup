import {Router} from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index", {message: "Le Bon Coup"});
})

routes.get("/ajout_produit", (req, res) => {
  // dbUse = connectDB();
  res.render("addProduct", {message: "Le Bon Coup"});
})

// routes.post('/members', validateFormConnect(), validate, connectUser )

export default routes;
