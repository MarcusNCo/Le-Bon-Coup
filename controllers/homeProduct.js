const { QueryTypes } = require('sequelize')
const { sequelize } = require('../utils/database')

exports.displayProduct = (req, res) => {
  const query =
    'SELECT * FROM products JOIN members ON products.id_members = members.id'
  try {
    const data = sequelize.query(query)
    data.then((data) => {
      res.render('index', { products: data[0] })
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getOneById = (req, res) => {
  const query = `SELECT * FROM products JOIN members ON products.id_members = members.id WHERE products.id = ${req.params.id};`
  try {
    const data = sequelize.query(query, { type: QueryTypes.SELECT })
    data.then((data) => {
      res.render('getOneProduct', { product: data[0] })
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getUserById = (req, res) => {
  const query = `SELECT * FROM members JOIN products ON members.id = products.id_members WHERE members.id = ${req.params.id};`
  try {
    const data = sequelize.query(query, { type: QueryTypes.SELECT })
    data.then((data) => {
      console.log(data)
      res.render('profilSeller', { member: data[0] })
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getAnnouncesById = (req, res) => {
  const query = `SELECT * FROM members JOIN products ON members.id = products.id_members WHERE members.id = ${req.params.id};`
  try {
    const data = sequelize.query(query, { type: QueryTypes.SELECT })
    data.then((data) => {
      console.log(data)
      res.render('announces', { membersProducts: data })
    })
  } catch (error) {
    console.log(error.message)
  }
}
