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
})