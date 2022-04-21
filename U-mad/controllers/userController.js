"use strict"

const bcrypt = require("bcryptjs")
const { User, UserDetail } = require("../models/index")

class UserController {
  static formSignUp(req, res) {
    res.render("signup")
  }

  static formLogin(req, res) {
    const error = req.query.error
    error ? res.render("land", { error }) : res.render(land)
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
      .then((result) => res.redirect("/user/login"))
      .catch((err) => res.send(err))
  }

  static postLogin(req, res) {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValid = bcrypt.compareSync(password, user.password)
          const error = "invalid Password"
          isValid ? res.send("benar") : res.redirect(`/user/login?error=${error}`)
        } else {
          const error = "invalid E-mail"
          res.redirect(`/user/login?error=${error}`)
        }
      })
      .catch((err) => res.send(err))
  }
}
module.exports = UserController