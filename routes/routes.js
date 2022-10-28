const {Router} =  require("express");
const productController = require("../controllers/homeProduct")
const {uploadFile, validateProductForm, validateErrors, saveProductToDB} = require("../controllers/productController")
const routes = new Router();

const {
  connectUser,
  signUpUser,
  favorite,
  favoriteUser,
} = require('../controllers/userController.js')
const {
  validate,
  validateFormSignUp,
} = require('../validationForm/validationFormConnect.js')
const {
  validateFormConnect,
} = require('../validationForm/validationFormConnect.js')

routes.get("/ajout_produit", (req, res) => {
    res.render("addProduct", {message: "Le Bon Coup", title:[]});
})

routes.post("/ajout_produit", uploadFile, validateProductForm(), validate, saveProductToDB);
routes.get(`/product/:id`, productController.getOneById);
routes.get('/', productController.displayProduct)

routes.get('/', (req, res) => {
  res.render('index', { message: 'Le Bon Coup' })
})
routes.get('/formConnect', (req, res) => {
  res.render('formConnect', { message: '' })
})

routes.post('/membersConnect', validateFormConnect(), validate, connectUser)

routes.get('/formSignUp', (req, res) => {
  res.render('formSignUp')
})

routes.post('/membersSignUp', validateFormSignUp(), validate, signUpUser)

routes.get(`/product/:id`, productController.getOneById)

routes.get(`/profil/:id`, productController.getUserById)

routes.get(`/favorite/:idAnnounce`, favorite)

routes.get('/getFavUser', favoriteUser)

routes.get(`/cat/:id`, productController.getProductCatById);

module.exports = routes
