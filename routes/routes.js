const {Router} =  require("express");
const productController = require("../controllers/homeProduct")
const {uploadFile, validateProductForm, validate, saveProductToDB} = require("../controllers/productController")
const routes = new Router();

routes.get("/", productController.displayProduct);

routes.get("/ajout_produit", (req, res) => {
    res.render("addProduct", {message: "Le Bon Coup", title:[]});
})

routes.post("/ajout_produit", uploadFile, validateProductForm(), validate, saveProductToDB);

module.exports = routes;
