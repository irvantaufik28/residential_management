const { Op } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  constructor() {
    this.UserModel = User;
  }
  async getUserByUsernameAndEmail(username, email) {
    return await this.UserModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }
  async getAllUser() {
    return await this.UserModel.findAll({
      attributes: { exclude: ["password"] },
    });
  }
  async getUserById(id) {
    return await this.UserModel.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
  }
  async getPrivate(id) {
    return await this.UserModel.findOne({
      where: { id }
    });
  }
  async getUserByEmail(email) {
    return await this.UserModel.findOne({
      where: { email },
    });
  }
  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username },
    });
  }
  async getUserByHomeId(homeId) {
    return await this.UserModel.findOne({
      where: { homeId },
      attributes: { exclude: ["password"] },
    });
  }
  async updateUser(user, id) {
    return await this.UserModel.update(user, {
      where: { id },
    });
  }
}
module.exports = UserRepository;
