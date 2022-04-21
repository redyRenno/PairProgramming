const express = require('express')
const router = express.Router()
const courses = require('./course')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/course', courses)

module.exports = router