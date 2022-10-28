const { sequelize } = require('../utils/database')
const { LocalStorage } = require('node-localstorage')
const { Sequelize } = require('sequelize')

exports.connectUser = (req, res) => {
  console.log(req.errorsFromValidation)
  localStorage = new LocalStorage('./scratch')
  const sql = `SELECT mail, id, password FROM members WHERE mail = '${req.body.mail}';`
  const result = sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT })
  result.then((data) => {
    if (data.length != 0) {
      if (
        data[0].password == req.body.password &&
        data[0].mail == req.body.mail
      ) {
        console.log('coucou ca marche')
        localStorage.setItem('connected', JSON.stringify(data[0].id))

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

exports.favorite = (req, res) => {
  localStorage = new LocalStorage('./scratch')
  const userId = localStorage.getItem('connected')
  const idAnnounce = req.params.idAnnounce
  const isCheckedSql = `SELECT * FROM favorites WHERE member_id = ${userId} AND product_id = ${idAnnounce}`
  const isChecked = sequelize.query(isCheckedSql, {
    type: Sequelize.QueryTypes.SELECT,
  })
  isChecked.then((data) => {
    if (data.length != 0) {
      const sql = `DELETE from favorites WHERE member_id = ${userId} AND product_id = ${idAnnounce}`
      const result = sequelize.query(sql, { type: Sequelize.QueryTypes.DELETE })

      result.then((data) => {
        res.send({ result: 'deleted' })
      })
    } else {
      const sql = `INSERT INTO favorites (member_id, product_id) VALUES ('${userId}', '${idAnnounce}')`
      const result = sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT })

      result.then((data) => {
        res.send({ result: data })
      })
    }
  })
}

exports.favoriteUser = (req, res) => {
  localStorage = new LocalStorage('./scratch')
  const userId = localStorage.getItem('connected')
  const sql = `SELECT product_id FROM favorites WHERE member_id = ${userId}`
  const result = sequelize.query(sql, {
    type: Sequelize.QueryTypes.SELECT,
  })
  result.then((data) => {
    res.send(data)
  })
}

exports.getAllFav = (req, res) => {
  localStorage = new LocalStorage('./scratch')
  const userId = localStorage.getItem('connected')
  const query = `SELECT * FROM favorites JOIN products ON products.id = favorites.product_id WHERE member_id = ${userId}`
  const data = sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  })
  data.then((data) => {
    console.log(data)
    res.render('favorites', { favoriteArray: data })
  })
}
