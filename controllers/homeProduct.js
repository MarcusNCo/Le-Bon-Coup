const {dbQuery} = require('../utils/database')

exports.displayProduct = (req,res)=>{ 
        const query = 'SELECT * FROM products';
        try {
            const data = dbQuery(query, data =>{
                res.render('index',{products:data})
            });
        } catch (error) {
            console.log(error.message);
        }
}




