const {User, UserDetail, UserCourse, Course, Category} = require('../models/index');

class Controller{
  static courseList(request, response) {
    let user;

    User.findByPk(1)
      .then((data) => {
        user = data

        
      })
  }

  static courseDetail(request, response) {
    const {courseId} = request.params;
    let course;
    let totalStudent;

    Course.findAll({
      include: {
        model: User,
        include: UserDetail
      }
    },{
      where: {
        id: courseId
      }
    }).then((data) => {
      course = data[0];

      return UserCourse.count({
        where: {
          CourseId: course.id
        }
      })
    })
      .then((data) => {
        totalStudent = data

        response.render('courseDetail', {
          course,
          totalStudent
        })
  
      })
      .catch((err) => {
        response.send(err)
      })
  }
}

module.exports = Controller