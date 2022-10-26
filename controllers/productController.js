const { check, validationResult } = require("express-validator");
const express = require("express");
const app = express();



app.use(express.json());
app.post(
  "/addProduct",
  check("productName").not().isEmpty().trim().escape(),
  check("productCateg").not().isEmpty().trim().escape().isInt({ min: 1, max: 10 }),
  check("productState").not().isEmpty().trim().escape().isInt({ min: 1, max: 5 }),
  check("productImage").not().isEmpty(),
  check("productDesc").not().isEmpty().trim().escape(),
  check("productPrice").not().isEmpty().toInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.productName,
      category: req.body.productCateg,
      state: req.body.productState,
      image: req.body.productImage,
      description: req.body.productDesc,
      price: req.body.productPrice,
    }).then((addProduct) => res.json(addProduct));
  }
);