const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', (req, res) => {
  res.send('Ini dari route course')
})
const isInstructor = (req, res, next) => {
  if (req.session.role !== "Instructor") {
    const error = "You Don't Have Access for This Feature"
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

router.use(isInstructor)

router.get('/add', Controller.formAddCourse)

router.post('/add', Controller.addCourse)

router.get('/:courseId', Controller.courseDetail)

router.get('/:courseId/edit', Controller.formEditCourse)

router.post('/:courseId/edit', Controller.editCourse)

router.get('/:courseId/delete', Controller.deleteCourse)

module.exports = router
