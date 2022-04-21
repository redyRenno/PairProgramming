"use strict"
const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")

const isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    const error = "Please login First!"
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}
const isInstructor = (req, res, next) => {
  if (req.session.role !== "Instructor") {
    const error = "You Don't Have Access for This Feature"
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

router.get("/signup", UserController.formSignUp)
router.post("/signup", UserController.postSignUp)
router.get("/login", UserController.formLogin)
router.post("/login", UserController.postLogin)

router.use(isLoggedIn)

router.get("/logout", UserController.logout)

router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router
