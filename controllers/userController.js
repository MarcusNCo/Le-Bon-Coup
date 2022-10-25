import { connectDB, querryDB } from '../utils/database'

export const connectUser = (req, res) => {
  connectDB()
  console.log(connectDB())
  let result = querryDB(
    `SELECT mail, password FROM members WHERE mail = ${req.body.mail}`,
  )

  if (result) {
    if (result.password == req.body.password) {
      // connecter la personne
    } else {
      // envoyer message erreur connexion
    }
  } else {
    // envoyer message mail ou mdp n'existe pas
  }
}
