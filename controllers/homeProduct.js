const {sequelize} = require('../utils/database')


exports.displayProduct = (req,res)=>{ 
        const query = 'SELECT * FROM products';
        try {
            const data =  sequelize.query(query);
            data.then(data=>{res.render('index', {products:data[0]})})
        } catch (error) {
            console.log(error.message);
        }
}




