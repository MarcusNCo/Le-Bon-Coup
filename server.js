const express = require('express')
const routes = require('./routes/routes.js')
const { fileURLToPath } = require('url')
const path = require('path')

// import express from "express";
// import routes from "./routes/routes.js";
// import {fileURLToPath} from "url";
// import path from "path";
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
)
const PORT = process.env.PORT || 8082
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);const {LocalStorage} = require('node-localstorage');


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use('/', routes)
const localStorage = new LocalStorage('./scratch');
app.locals.localStorageCat = JSON.parse(localStorage.getItem('cat'));

app.listen(PORT, () => {
  console.log('Notre server est en marche sur, ', PORT)
})
