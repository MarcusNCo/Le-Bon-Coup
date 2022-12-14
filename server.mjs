import express from "express";
import routes from "./routes/routes.mjs";
import {fileURLToPath} from "url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8082;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", routes);

app.listen(PORT, () => {							
  console.log('Notre server est en marche sur, ', PORT);
});