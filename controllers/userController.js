const { sequelize } = require('../utils/database')
const { LocalStorage } = require('node-localstorage')
const { Sequelize } = require('sequelize')

exports.connectUser = (req, res) => {
  console.log(req.errorsFromValidation)
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
        errorConnectMail: 'Veuillez entrer un mail valide',
        errorConnectPassword: 'Veuillez entrer un Mot de passe valide',
      })
    }
  })
}

exports.signUpUser = (req, res) => {
  console.log(req.body)
  const sql = `INSERT INTO members (lastname, firstname,  phone_number, mail, password, address, role) VALUES ('${req.body.lastname}','${req.body.firstname}','${req.body.phone_number}','${req.body.mail}', '${req.body.password}','${req.body.address}', '2' )`
  const result = sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT })

  result.then((data) => {
    if (data.length != 0) {
      console.log('inscription ok')
      res.redirect('/formConnect')
    } else {
      res.render('formSignUp', {
        errorSignUpFirstname: 'Veuillez entrer un nom valide',
        errorSignUpLastname: 'Veuillez entrer un prénom valide',
        errorSignUpPhone: 'Veuillez entrer un numéro de telephone valide',
        errorSignUpAddress: 'Veuillez entrer une adresse valide',
        errorSignUppassword: 'Veuillez entrer un mot de passe valide',
        errorSignUpMail: 'Veuillez entrer un mail valide',
      })
    }
  })
}
