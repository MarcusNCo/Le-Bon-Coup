const { Router } = require('express')
const productController = require('../controllers/homeProduct')
const { connectUser } = require('../controllers/userController.js')
const { validate } = require('../validationForm/validationFormConnect.js')
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

routes.get('/membersSignUp', (req, res) => {
  res.render('formSignUp')
})

module.exports = routes
