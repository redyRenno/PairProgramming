"use strict"

const express = require('express');
const router = express.Router();
const routerUsers = require('./user');

router.get('/', (req, res) => {
  res.send('land');
});

router.use('/user', routerUsers);

module.exports = router
