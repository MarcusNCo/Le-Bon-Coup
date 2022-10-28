const {
    QueryTypes
} = require('sequelize');
const {
    sequelize
} = require('../utils/database');
const {
    LocalStorage
} = require('node-localstorage');

var localStorage = new LocalStorage('./scratch');

exports.displayProduct = (req, res) => {
    const query = 'SELECT products.id, products.price, products.place, products.advert_date, products.description, products.state, products.img_product, members.lastname, members.firstname FROM products JOIN members ON products.id_members = members.id;';
    const query2 = 'SELECT * FROM categories';
    try {
        const cat = sequelize.query(query2, {
            type: QueryTypes.SELECT
        });
        const data = sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        data.then(data => {
            console.log(data);
            cat.then(
                cat => {
                    localStorage.setItem('cat', JSON.stringify(cat));
                    res.render('index', {
                        products: data
                    })
                }
            )
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.getOneById = (req, res) => {
    const query = `SELECT * FROM products JOIN members ON products.id_members = members.id WHERE products.id = ${req.params.id};`;
    try {
        const data = sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        data.then(data => {
            res.render('getOneProduct', {
                product: data[0]
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.getUserById = (req, res) => {
    const query = `SELECT * FROM members JOIN products ON products.id_members = members.id WHERE members.id = ${req.params.id};`;
    try {
        const data = sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        data.then(data => {
            res.render('profilSeller', {
                member: data
            })
        });
    } catch (error) {
        console.log(error.message);
    }
}

exports.getProductCatById = (req, res) => {
    const query = `SELECT products.id, products.price, products.place, products.advert_date, products.description, products.state, products.img_product, products.id, categories.name FROM products JOIN categories ON products.category_id = categories.id WHERE categories.id = ${req.params.id};`
    try {
        const data = sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        data.then(data => {
            res.render('catItems',{oneCat: data});
        })
    } catch (error) {
        console.log(error.message);
    }
}