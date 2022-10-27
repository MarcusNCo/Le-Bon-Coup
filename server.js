const express = require("express") ;
const routes = require("./routes/routes.js");
const {fileURLToPath} = require("url");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8082;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", routes);

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});