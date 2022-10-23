'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Home extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: {name : 'homeId'},
      })
    }
  }
  Home.init({
    home_number: DataTypes.STRING,
    isActive : DataTypes.BOOLEAN,
    isTenant: DataTypes.BOOLEAN,
    isAtHome : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Home',
  });
  return Home;
};