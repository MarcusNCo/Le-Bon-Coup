const hostDb = 'localhost'
const userDb = 'root'
const pwdDb = ''

export var connectDB = () => {
  var mysql = require('mysql')

  var con = mysql.createConnection({
    host: hostDb,
    user: userDb,
    password: pwdDb,
  })

  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
  })
}

export var querryDB = (sql) => {
  con.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log('Result: ' + result)
    })
  })
}
