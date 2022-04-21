<<<<<<< HEAD
const express = require('express')
const routes = require('./routes/index')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
=======
"use strict"
const express = require('express');
const app = express();
const port = 3000;
const session = require("express-session")
const routes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // kalo dev false aja, pas udah deploy jadi true biar jadi https
    sameSite: true // untuk security dari csrf attack
  }
}))

app.use(routes);

app.listen(port, function () {
  console.log("this app running in port :", port);
>>>>>>> 507d251d89c354a45d6fb4961994de9830606ae1
})