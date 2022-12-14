const { Home } = require("../models");

class HomeRepository {
  constructor() {
    this.HomeModel = Home;
  }
  async getHomeByUserId(userId) {
    return await this.HomeModel.findOne({
      where: { userId },
    });
  }
  async getAllHome() {
    return await this.HomeModel.findAll();
  }
  async getHomeById(id) {
    return await this.HomeModel.findOne({
      where: { id },
    });
  }
  async createHome(homeData) {
    return await this.HomeModel.create(homeData);
  }
  async updateHome(data, id) {
    return await this.HomeModel.update(data, {
      where: { id },
    });
  }
  async deleteHome(id) {
    return await this.HomeModel.destroy({
      where: { id },
    });
  }
}
module.exports = HomeRepository;
