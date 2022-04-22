'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     toRupiah() {
      return `Rp.  ${this.price.toLocaleString('id-ID')},00` 
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Category)
      this.belongsToMany(models.User, { through: models.UserCourse })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    videoURL: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Course',
    hooks: {
      beforeValidate: (course, options) => {
        console.log(course.CategoryId,'<<<<<<<<<<<');
        switch(course.CategoryId) {
          case 1:
            course.price = 150000;
            break;
          case 2:
            course.price = 170000;
            break;
          case 3:
            course.price = 350000;
            break;
          case 4:
            course.price = 125000;
            break;
          case 5:
            course.price = 145000;
            break;
          case 6:
            course.price = 160000;
            break;
          case 7:
            course.price = 150000;
            break;
        }
      }
    }
  });
  return Course;
};