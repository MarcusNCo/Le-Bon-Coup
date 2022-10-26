const hostDb = "localhost";
const userDb = "root";
const pwdDb = "";
const dbName = "le_bon_coup";

var mysql = require("mysql");

const connectDB = mysql.createConnection({
    host: hostDb,
    user: userDb,
    password: pwdDb,
    database: dbName
});

module.exports.querydB = (sql) => {
  connectDB.connect = (err) => {
    if(err) {
      throw new Error("La connexion à échoué.");
    } else {
      return connectDB.query(sql, (err, row) => {
        if(err) {
          throw new Error("La requête n'a pas aboutie.")  ; 
        } else {
          return row;
        }
      })
    }
  }
};

// connectDB.connect = () => {
//   console.log("ok")
// }