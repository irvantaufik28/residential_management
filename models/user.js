'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    leader: DataTypes.BOOLEAN,
    birth: DataTypes.STRING,
    isMale: DataTypes.BOOLEAN,
    married: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    job: DataTypes.STRING,
    homeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};