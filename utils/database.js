
const mysql = require("mysql");

// function pour se connecter à la base de données

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "le_bon_coup",
    multipleStatements: true
});

exports.dbQuery = (sql, callback)=> {
    mysqlConnection.connect((err) => {
    if (err) {
        throw new Error('La Connexion a echoué !')
    } else {
        console.log('Connexion réussie !');
        mysqlConnection.query(sql,(err,rows)=> {
            if (err) {
                throw new Error('La requête a echoué !')
            } else {
                return callback(rows);
            }
        });
    }
});
}
