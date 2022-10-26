const { sequelize } = require('../utils/database')
const { LocalStorage } = require('node-localstorage')
const { Sequelize } = require('sequelize')

exports.connectUser = (req, res) => {
  localStorage = new LocalStorage('./scratch')
  const sql = `SELECT mail, password FROM members WHERE mail = '${req.body.mail}';`
  const result = sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
  result.then((data) => {
    if (data.length != 0) {
      if (
        data[0].password == req.body.password &&
        data[0].mail == req.body.mail
      ) {
        console.log('coucou ca marche')
        localStorage.setItem('connected', JSON.stringify(data[0]))

        res.redirect('/')
      } else {
        console.log('connexion echouée')
      }
    } else {
      res.render('formConnect', {
        error: "Mail et/ou Mot de passe n'existe pas",
      })
    }
  })
}

exports.signUpUser = (req, res) => {
  const sql = `INSERT INTO members ('lastname', 'firstname', 'validation_date',  'phone_number', 'mail', 'password', 'address') 
  VALUES (,[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11])`
  const result = sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
}
