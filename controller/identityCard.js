const resData = require("../helper/response");
module.exports = {
  getIdentityCardById: async (req, res, next) => {
    try {
      let { id } = req.params
      const identityCard = await req.identityCardUC.getIdentityCardId(id);
      if (!identityCard.isSuccess) {
        return res
          .status(identityCard.status)
          .json(resData.failed(identityCard.reason, identityCard.data));
      }
      return res.json(resData.success(identityCard.data));
    } catch (e) {
      next(e);
    }
  },

  getIdentityCardByUserId: async (req, res, next) => {
    try {
      let { id } = req.params;
      const identityCard = await req.identityCardUC.getIdentityCardByUserId(id);
      if (!identityCard.isSuccess) {
        return res
          .status(identityCard.status)
          .json(resData.failed(identityCard.reason, identityCard.data));
      }
      return res.json(resData.success(identityCard.data));
    } catch (e) {
      next(e);
    }
  },

  getIdentityCardByCardType: async (req, res, next) => {
    try {
      let { card_type } = req.query;
      const identityCard = await req.IdentityCardUC.getIdentityCardByCardType(card_type);
      if (!identityCard.isSuccess) {
        return res
          .status(identityCard.status)
          .json(resData.failed(identityCard.reason, identityCard.data));
      }
      return res.json(resData.success(identityCard.data));
    } catch (e) {
      next(e);
    }
  },

  createIdentityCard: async (req, res, next) => {
    try {
      let identityCardData = req.body
      const identityCard = await req.IdentityCardUC.createIdentityCard(identityCardData);
      if (!identityCard.isSuccess) {
        return res
          .status(identityCard.status)
          .json(resData.failed(identityCard.reason, identityCard.data));
      }
      return res.status(identityCard.status).json(resData.success(identityCard.data));
    } catch (e) {
      next(e);
    }
  },

  updateIdentityCard: async (req, res, next) => {
    try {
      let { id } = req.params;
      let identityCard = req.body
      let newIdentityCard = await req.identityCardUC.updateIdentityCard(identityCard, id);
      if (!newIdentityCard.isSuccess) {
        return res.status(newIdentityCard.status).json(resData.failed(newIdentityCard.reason));
      }
      res.json(resData.success());
    } catch (e) {
      next(e);
    }
  },
  deleteIdentityCard: async (req, res, next) => {
    try {
      let { id } = req.params;
      let identityCard = await req.identityCardUC.deleteIdentityCard(id);
      if (!identityCard.isSuccess) {
        return res.status(404).json(resData.failed(identityCard.reason, null));
      }
      res.status(200).json(resData.success());
    } catch (e) {
      next(e);
    }
  },
};
