const { Router } = require('express')
const productController = require('../controllers/homeProduct')
const { connectUser, signUpUser } = require('../controllers/userController.js')
const {
  validate,
  validateFormSignUp,
} = require('../validationForm/validationFormConnect.js')
const {
  validateFormConnect,
} = require('../validationForm/validationFormConnect.js')

const routes = new Router()

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

module.exports = routes
