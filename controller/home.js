const resData = require("../helper/response");
module.exports = {
  gethomeById: async (req, res, next) => {
    try {
      let { id } = params.id;
      const home = await req.homeUC.getHomeById(id);
      if (!home.isSuccess) {
        return res
          .status(home.status)
          .json(resData.failed(home.reason, home.data));
      }
      return res.json(resData.success(home.data));
    } catch (e) {
      next(e);
    }
  },
  getAllhome: async (req, res, next) => {
    try {
      let home = await req.homeUC.getAllhome();
      return res.json(resData.success(home.data));
    } catch (e) {
      next(e);
    }
  },

  gethomeByUserId: async (req, res, next) => {
    try {
      let { id } = params.id;
      const home = await req.homeUC.getHomeByUserId(id);
      if (!home.isSuccess) {
        return res
          .status(home.status)
          .json(resData.failed(home.reason, home.data));
      }
      return res.json(resData.success(home.data));
    } catch (e) {
      next(e);
    }
  },

  createHome: async (req, res, next) => {
    try {
      let homeData = {
        home_number: req.body.home_number,
        isActive: true,
      };
      const home = await req.homeUC.createHome(homeData);
      if (!home.isSuccess) {
        return res
          .status(home.status)
          .json(resData.failed(home.reason, home.data));
      }
      return res.status(home.status).json(resData.success(addhome.data));
    } catch (e) {
      next(e);
    }
  },

  updateHomeByAdmin: async (req, res, next) => {
    try {
      let { id } = req.params;
      let home = {
        home_number: req.body.home_number,
        isActive: req.body.isActive,
        isTenant: req.body.isTenant,
      };
      let newHome = await req.homeUC.updatehome(home, id);
      if (!newHome.isSuccess) {
        return res.status(newHome.status).json(resData.failed(newHome.reason));
      }
      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  updateHomeByMember: async (req, res, next) => {
    try {
      let { id } = req.user.id;
      let home = {
        isAtHome: req.body.isAtHome,
      };
      let newHome = await req.homeUC.updatehome(home, id);
      if (!newHome.isSuccess) {
        return res.status(newHome.status).json(resData.failed(newHome.reason));
      }
      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },

  deletehome: async (req, res, next) => {
    try {
      let { id } = req.params;
      let home = await req.homeUC.deletehome(id);
      if (!home.isSuccess) {
        return res.status(404).json(resData.failed(home.reason, null));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
