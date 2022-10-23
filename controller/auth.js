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
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        headOfFamily : req.body.headOfFamily,
        birth : new Date(req.body.birth),
        isMale : req.body.isMale,
        isMarried : req.body.isMarried,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        homeId : null,
        job : req.body.job,
        roleId: 2,
        isRegistered: false
      };
      let resUser = await req.authUC.register(userData);
      if (resUser.isSuccess !== true) {
        return res.status(resUser.status).json(resData.failed(resUser.reason));
      }
      res.status(200).json(
        resData.success(resUser.data)
      );
    } catch (e) {
      next(e);
    }
  },
};
