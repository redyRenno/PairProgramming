const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

const isInstructor = (req, res, next) => {
  if (req.session.role !== "Instructor") {
    const error = "You Don't Have Access for This Feature"
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
}

router.get('/', (req, res) => {
  res.send('Ini dari route course')
})

// router.use(isInstructor)

router.get('/add', isInstructor, Controller.formAddCourse)

router.post('/add', isInstructor,  Controller.addCourse)

router.get('/myCourse', Controller.courseList)

router.get('/:courseId/myCourse', Controller.myCourseDetail)

router.get('/:courseId', Controller.courseDetail)

router.get('/:courseId/edit', Controller.formEditCourse)

router.post('/:courseId/edit', Controller.editCourse)

router.get('/:courseId/delete', Controller.deleteCourse)

module.exports = router
