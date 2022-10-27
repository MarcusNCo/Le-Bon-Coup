const { check, validationResult } = require('express-validator')
const { sequelize } = require('../utils/database')
const { Sequelize } = require('sequelize')
const multer = require("multer");
const { LocalStorage } = require('node-localstorage')

var fileName = '';
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads/');
  },
  filename: function (req, file, callback) {
      fileName = file.originalname;
      callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('image');
exports.uploadFile = multer({ storage: storage }).single('image');

exports.validateProductForm = () => {
  return [
    check("title", "Le nom du produit n'est pas conforme").notEmpty().trim().escape(),
    check("category", "Veillez choisir une catégorie").isNumeric().toInt().isInt({ min: 1, max: 10}),
    check("state", "Veuillez choisir l'état").isNumeric().toInt().isInt({ min: 1, max: 5}),
    check("description", "La description n'est pas conforme").notEmpty().trim().escape(),
    check("place", "Le lieu n'est pas sous le bon format").notEmpty().trim().escape(),
    check("price", "Mettre un prix valide").isNumeric().toInt(),
  ]
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
}

exports.saveProductToDB = (req, res) => {
  let memberId = 0;
  let sql = "";
  let result = "";

  const memberMail = JSON.parse(localStorage.getItem('myFirstKey'));

  sql = `SELECT id FROM members WHERE mail = '${memberMail[0]}';`
  result = sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
  result.then((data) => {
    if (data.length != 0) {
      memberId = data[0].id;
    } else {
      res.render('addProduct', {
        error: "Problème de récupération de l'id de l'utilisateur",
      })
    }
  })

  // Move file in right directory 
  var fs = require('fs');
  var dir = './uploads/' + memberId + '/';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  var oldPath = './uploads/' + fileName;
  var newPath = dir + fileName;
  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
    console.log('Successfully renamed and moved!')
  })
  // ----------------------------


  sql = `INSERT INTO products (category_id, price, place, description, title, id_members, state, img) VALUES ('${req.body.category}', '${req.body.price}', '${req.body.place}', '${req.body.description}', '${req.body.title}', '${memberId}', '${req.body.state}', '${newPath}');`
  result = sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT })
  result.then((data) => {
    if (data.length != 0) {
      console.log('Ajout produit ok');
      res.redirect('/');
    } 
    else {
      console.log('Ajout produit nok');
    }
  })
}
