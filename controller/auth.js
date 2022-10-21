const resData = require("../helper/response");
module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;
      let resUser = await req.authUC.login(username, password);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      res.status(200).json(
        resData.success({
          user: resUser.data,
          token: resUser.token,
        })
      );
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {
    try {
      let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        leader: req.body.leader,
        birth: req.body.birth,
        isMale: req.body.isMale,
        married: req.body.married,
        email: req.body.email,
        phone: req.body.phone,
        job: req.body.job,
        homeId: reb.body.homeId,
        roleId: 1,
        isAdmin: false
      };
      let resUser = await req.authUC.register(userData);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      res.status(200).json(
        resData.success({
          user: resUser.data,
          token: resUser.token,
        })
      );
    } catch (e) {
      next(e);
    }
  },
};
