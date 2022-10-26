
const mysql = require("mysql");

// function pour se connecter à la base de données

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "le_bon_coup"
});

// console.log(mysqlConnection.ping())

exports.dbQuery = (sql, callback)=> {

  // mysqlConnection.ping((err) => {
  //   if(err) console.log(res.status(500).send("MySQL Server is Down"));
      
  //   res.send("MySQL Server is Active");
  // })



  // console.log(mysqlConnection.ping)

  // console.log(mysqlConnection.state + 'okkkkkkkkkkk')
  if (mysqlConnection.state == "disconnected") {
    mysqlConnection.connect((err) => {
      if (err) {
          throw new Error('La Connexion a echoué !');
      }
    })
  }

  // console.log('Connexion réussie !');
  mysqlConnection.query(sql,(err,rows)=> {
      if (err) {
          throw new Error('La requête a echoué !')
      } else {
          mysqlConnection.end();
          return callback(rows);
      }
  });
}

