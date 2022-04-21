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
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsToMany(models.User, { through: models.UserCourse })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    videoURL: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    hook: {
      beforeValidate: (category, options) => {
        switch(category.price) {
          case 1:
            category.price = 150000;
            break;
          case 2:
            category.price = 170000;
            break;
          case 3:
            category.price = 350000;
            break;
          case 4:
            category.price = 125000;
            break;
          case 5:
            category.price = 145000;
            break;
          case 6:
            category.price = 160000;
            break;
          case 7:
            category.price = 150000;
            break;
        }
      }
    },
    sequelize,
    modelName: 'Course',
  });
  return Course;
};