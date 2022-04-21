const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('Ini dari route course')
})

router.get('/add', Controller.formAddCourse)

router.post('/add', Controller.addCourse)

router.get('/:courseId', Controller.courseDetail)

module.exports = router
