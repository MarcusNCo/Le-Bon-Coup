const {Router} =  require("express");
const productController = require("../controllers/homeProduct")
const routes = new Router();

routes.get("/", productController.displayProduct);

routes.get(`/product/:id`, productController.getOneById);

routes.get(`/profil/:id`, productController.getUserById);

module.exports = routes;
