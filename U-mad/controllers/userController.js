"use strict"
const bcrypt = require("bcryptjs")
const { User, UserDetail } = require("../models/index")

class UserController {
  static formSignUp(req, res) {
    res.render("signup")
  }

  static formLogin(req, res) {
    const { error } = req.query
    res.render("land", { error })
  }

  static postSignUp(req, res) {
    const { firstName, lastName, birthDate, phoneNumber, email, password, role } = req.body
    const user = { email, password, role }

    User.create(user)
      .then((user) => {
        const UserId = user.id
        const detail = { firstName, lastName, birthDate, phoneNumber, UserId }

        return UserDetail.create(detail)
      })
      .then((result) => res.redirect("/login"))
      .catch((err) => res.send(err))
  }

  static postLogin(req, res) {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValid = bcrypt.compareSync(password, user.password)
          const error = "invalid Password"

          if (isValid) {
            req.session.userId = user.id
            req.session.role = user.role
            res.redirect("/")
          } else {
            res.redirect(`/login?error=${error}`)
          }

        } else {
          const error = "invalid E-mail"
          res.redirect(`/login?error=${error}`)
        }
      })
      .catch((err) => res.send(err))
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      err ? res.send(err) : res.redirect("/login")
    })
  }
}


module.exports = UserController