const {Router} =  require("express");
const productController = require("../controllers/homeProduct")
const productValidate = require("../controllers/productController")
const routes = new Router();

routes.get("/", productController.displayProduct);

routes.get("/ajout_produit", (req, res) => {
    res.render("addProduct", {message: "Le Bon Coup"});
})

// routes.get("/ajout_produit", productValidate.validateProductForm);

routes.post('/ajout_produit',  productValidate.validateProductForm);

module.exports = routes;
