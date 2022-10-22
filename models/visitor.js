'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visitor.init({
    name: DataTypes.STRING,
    relationship : DataTypes.STRING,
    homeAddress : DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut:DataTypes.DATE,
    longStay :DataTypes.INTEGER,
    homeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};