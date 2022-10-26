const {Router} =  require("express");
const productController = require("../controllers/homeProduct")
const routes = new Router();

routes.get("/", productController.displayProduct);

module.exports = routes;
