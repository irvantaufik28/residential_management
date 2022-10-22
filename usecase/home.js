class Home {
  constructor(HomeRepository, UserRepository) {
    this.HomeRepository = HomeRepository;
    this.UserRepository = UserRepository;
  }

  async getHomeById(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };
    const home = await this.HomeRepository.getHomeById(id);
    if (home === null) {
      result.reason = "home not found";
      return result;
    }
    const users = await this.UserRepository.getUserByHomeId(home.id);
    let homes = {
      id: home.id,
      home_number: home.home_number,
      bills_id: home.bills_id,
      isActive: home.isActive,
      createdAt: Home.createdAt,
      updatedAt: Home.updatedAt,
      users: users,
    };
    result.isSuccess = true;
    result.status = 200;
    result.data = homes;
    return result;
  }

  async getAllHome(filters) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: [],
    };

    const home = await this.HomeRepository.getAllhome(filters);
    result.isSuccess = true;
    result.status = 200;
    result.data = home;
    return result;
  }

  async getHomeByUserId(userId) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: [],
    };
    const home = await this.HomeRepository.getHomeByUserId(userId);
    if (home === null) {
      result.reason = "home not found";
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = home;
    return result;
  }

  async createHome(homeData) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };
    const home = await this.HomeRepository.creatHome(homeData);
    if (home === null) {
      result.reason = "failed create Home";
      return result;
    }
    result.isSuccess = true;
    result.status = 201;
    result.data = home;
    return result;
  }

  async updateHomeByAdmin(homeData, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };

    const home = await this.HomeRepository.updateHome(id);
    if (home === null) {
      result.reason = "home not found";
      return result;
    }
    const newHome = await this.HomeRepository.updateHome(homeData, id);
    result.isSuccess = true;
    result.status = 204;
    result.data = newHome;
    return result;
  }
  
  async updateHomeByUser(homeData, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };

    const home = await this.HomeRepository.updateHome(id);
    if (home === null) {
      result.reason = "home not found";
      return result;
    }
    const newHome = await this.HomeRepository.updateHome(homeData, id);
    result.isSuccess = true;
    result.status = 204;
    result.data = newHome;
    return result;
  }


  async deleteHome(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: "",
      data: null,
    };
    let home = await this.HomeRepository.getHomeByID(id);
    if (home === null) {
      result.reason = "home not found";
      return result;
    }
    await this.HomeRepository.deleteHome(id);
    result.isSuccess = true;
    result.status = 204;
    return result;
  }
}

module.exports = Home;