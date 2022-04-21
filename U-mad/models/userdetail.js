'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get fullName() {
      return this.firstName + ' ' + this.lastName
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  UserDetail.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phoneNumber: DataTypes.BIGINT(14),
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const num = `${instance.phoneNumber}`.replace("0", "62")

        instance.phoneNumber = +num
      }
    },
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};