import {Router} from "express";
import express from "express";
import { validate, validateFormConnect } from "../validationForm/validationFormConnect.mjs";
import { body, check, validationResult } from "express-validator";

const routes = new Router();

routes.get("/", (req, res) => {
  res.render("index", {message: "Le Bon Coup"});
})
  routes.get("/formConnect", (req, res) => {
    res.render("formConnect", {message: ""});
})

routes.post('/members', validateFormConnect(), validate )

export default routes;
