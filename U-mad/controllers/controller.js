const {User, UserDetail, Course, Category} = require('../models/index');

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

    User.findAll({include: UserDetail}).then((data) => {response.send(data)})

    // Course.findAll({
    //   include: {
    //     model: User,
    //     include: [{
    //       model: UserDetail,
    //       rightJoin
    //     }]
        
    //   }
    // },{
    //   where: {
    //     id: courseId
    //   }
    // })
    //   .then((data) => {
    //     // response.render('courseDetail', {
    //     //   course: data
    //     // })
    //     response.send(data)
    //   })
    //   .catch((err) => {
    //     response.send(err)
    //   })
  }
}

module.exports = Controller