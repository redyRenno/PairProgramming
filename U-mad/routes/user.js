"use strict"
const express = require("express")
const routerUser = express.Router()
const UserController = require("../controllers/userController")

routerUser.get("/signup", UserController.formSignUp)
routerUser.post("/signup", UserController.postSignUp)
routerUser.get("/login", UserController.formLogin)
routerUser.post("/login", UserController.postLogin)

module.exports = routerUser