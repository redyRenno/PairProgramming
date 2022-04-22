const {User, UserDetail, UserCourse, Course, Category} = require('../models/index');
const { Op } = require("sequelize");

class Controller{
  static courseList(request, response) {
    const {userId, role} = request.session;
    const {myCourse} = request.query;
    let user;

    User.findAll({
      where: {
        id: +userId
      }, 
      include: {
        model: Course
      }
      })
        .then((data) => {
          response.send(data)
        })
        .catch((err) => {
          response.send(err)
        })

    
      
    // let filter;
    // if(!myCourse) {
    //   filter = {
    //     UserId: {[Op.ne]: userId}
    //   }
    // } else {
    //   filter = {
    //     UserId: userId
    //   }
    // }
    
    // User.findByPk(+userId, {
    //   include: {model: UserDetail}
    // })
    //   .then((data) => {
    //     user = data
    //     console.log(user);
    //     if (role === 'Student') {
    //       return User.findAll({
    //         where: filter,
    //         include: Course
    //       })
    //     } else {
    //       return Course.findAll({
    //         where: filter,
    //         include: {
    //           model: Category
    //         }
    //       })
    //     }
    //   })
    //   .then((data) => {
    //     // response.render('home', {
    //     //   user,
    //     //   courses: data,
    //     //   role,
    //     //   myCourse
    //     // })
    //     response.send(data)
    //   })
    //   .catch((err) => {
    //     response.send(err)
    //   })
  }

  static courseDetail(request, response) {
    const {userId, role} = request.session;
    const {courseId} = request.params;
    console.log(courseId);
    let course;
    let totalStudent;

    Course.findByPk(+courseId, {
      include: {
        model: User,
        include: UserDetail
      }
    }).then((data) => {
      course = data;

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
          totalStudent,
          role
        })
      })
      .catch((err) => {
        response.send(err)
      })
  }

  static myCourseDetail(request, response) {
    const {userId, role} = request.session;
    const {courseId} = request.params;
    console.log(courseId);
    let course;
    let totalStudent;

    Course.findByPk(+courseId, {
      include: {
        model: User,
        include: UserDetail
      }
    }).then((data) => {
      course = data;

      return UserCourse.count({
        where: {
          CourseId: course.id
        }
      })
    })
      .then((data) => {
        totalStudent = data
        response.render('myCourseDetail', {
          course,
          totalStudent,
          role
        })
      })
      .catch((err) => {
        response.send(err)
      })
  }

  static formAddCourse(request, response) {
    Category.findAll()
      .then ((data) => {
        response.render('addCourse', {
          categories: data
        })
      })
      .catch((err) => {
        response.send(err)
      })
  }

  static addCourse(request, response) {
    const {name, videoURL, description, category} = request.body;
    const {userId, role} = request.session;

    Course.create({
      name: name,
      price: category,
      videoURL: videoURL,
      description: description,
      UserId: userId,
      CategoryId: +category
    }, {
      individualHooks: true
    }).then((data) => {
      response.redirect('/course/myCourse?myCourse=true')
    })
    .catch((err) => {
      response.send(err)
    })
  }

  static formEditCourse(request, response) {
    const {courseId} = request.params;
    let course;
    let category;
  

    Course.findByPk(+courseId)
      .then((data) => {
        course = data
        console.log(course);

        return Category.findByPk(course.CategoryId)
      })
      .then((data) => {
        category = data
        return Category.findAll()
      })
      .then((data) => {

        response.render('editCourse', {
          course,
          categories: data,
          category: category
        })
       
      })
      .catch((err) => {
        response.send(err)
      })
  }

  static editCourse(request, response) {
    const {courseId} = request.params;
    const {name, videoURL, description, category} = request.body;
    const {userId, role} = request.session;

    console.log(+category, '>>>>>>>>>>>>');
    Course.update({
      name: name,
      price: +category,
      videoURL: videoURL,
      description: description,
      UserId: userId,
      CategoryId: +category
    }, {
      where: { id: +courseId }, 
      individualHooks: true 
    })
      .then((data) => {
        response.redirect('/course/myCourse?myCourse=true')
      })
      .catch((err) => {
        console.log(err);
        response.send(err)
      })
  }

  static deleteCourse(request, response) {
    const {courseId} = request.params;

    Course.destroy({
      where: {
        id: +courseId
      }
    })
      .then((data) => {
        response.redirect('/course/myCourse?myCourse=true')
      })
      .catch((err) => {
        response.send(err)
      })
  }
}

module.exports = Controller