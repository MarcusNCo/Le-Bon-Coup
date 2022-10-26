const { body, validationResult } = require("express-validator");
const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer({ dest: '../public/uploads/' })

exports.validateProductForm = () => {
  app.use(express.json());
  app.post(
    "/addProduct",
    upload.single('productImage'),
    body("productName", "Le nom du produit n'est pas conforme").not().isEmpty().trim().escape(),
    body("productCateg", "Veillez choisir une catégorie").not().isEmpty().trim().escape().isInt({ min: 1, max: 10 }),
    body("productState", "Veuillez choisir l'état").not().isEmpty().trim().escape().isInt({ min: 1, max: 5 }),
    body("productImage", "").not().isEmpty(),
    body("productDesc").not().isEmpty().trim().escape(),
    body("productPrice").not().isEmpty().toInt(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      AddProduct.create({
        name: req.body.productName,
        category: req.body.productCateg,
        state: req.body.productState,
        image: req.body.productImage,
        description: req.body.productDesc,
        price: req.body.productPrice,
      }).then((addProduct) => res.json(addProduct));
      // return AddProduct;
      console.log(AddProduct);
    }
  );
}