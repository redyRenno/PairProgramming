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
          totalStudent
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

    Course.create({
      name: name,
      price: category,
      videoURL: videoURL,
      description: description,
      UserId: '1',
      CategoryId: +category
    }, {
      individualHooks: true
    }).then((data) => {
      response.send('Berhasil tersimpan')
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

    console.log(+category, '>>>>>>>>>>>>');
    Course.update({
      name: name,
      price: +category,
      videoURL: videoURL,
      description: description,
      UserId: '1',
      CategoryId: category
    }, {
      where: { id: +courseId }, 
      individualHooks: true 
    })
      .then((data) => {
        response.send('Berhasil edit')
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
        response.send('Berhasil dihapus')
      })
      .catch((err) => {
        response.send(err)
      })
  }
}

module.exports = Controller