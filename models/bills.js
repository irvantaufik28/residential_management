'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bills.init({
    name: DataTypes.STRING,
    due_date_payment: DataTypes.DATE,
    mandatory_payment: DataTypes.BOOLEAN,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bills',
  });
  return Bills;
};