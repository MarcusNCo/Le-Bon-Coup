import express from "express";
import routes from "./routes/routes.mjs";
import {fileURLToPath} from "url";
import path from "path";


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}))

const PORT = process.env.PORT || 8082;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", routes);

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});