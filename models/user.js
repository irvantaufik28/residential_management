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
      this.belongsTo(models.Home, {
        foreignKey: {name : 'homeId', allowNull:false},
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    headOfFamily: DataTypes.BOOLEAN,
    birth: DataTypes.DATE,
    isMale: DataTypes.BOOLEAN,
    isMarried: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    job: DataTypes.STRING,
    homeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    isRegistered : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};