const { dbQuery } = require('../utils/database')
const { LocalStorage } = require('node-localstorage')

exports.connectUser = (req, res) => {
  localStorage = new LocalStorage('./scratch')
  dbQuery(
    `SELECT mail, password FROM members WHERE mail = '${req.body.mail}';`,
    (result) => {
      console.log('result.password', result[0].password)
      if (result) {
        if (result[0].password == req.body.password) {
          console.log('coucou ca marche')
          localStorage.setItem('connected', JSON.stringify(result[0]))

          res.redirect('/')
        } else {
          // envoyer message erreur connexion
        }
      } else {
        // envoyer message mail ou mdp n'existe pas
      }
    },
  )
}

exports.displayProduct = (req, res) => {
  const query = 'SELECT * FROM products'
  try {
    const data = dbQuery(query, (data) => {
      res.render('index', { products: data })
    })
  } catch (error) {
    console.log(error.message)
  }
}
