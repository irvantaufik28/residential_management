const { IdentityCard } = require("../models");

class IdentityCardRepository {
  constructor() {
    this.IdentityCardModel = IdentityCard;
  }
  async getIdentityCardById( id ) {
    return await this.IdentityCardModel.findOne({
      where: { id },
    });
  }
  async getIdentityCardByUserId(userId) {
    return await this.IdentityCardModel.findAll({
      where: { userId },
    });
  }
  
  async getIdentityCardByCardType(card_type) {
    return await this.IdentityCardModel.findAll({
      where: { card_type },
    });
  }
  async createIdentityCard(IdentityCardData) {
    return await this.IdentityCardModel.create(IdentityCardData);
  }
  async updateIdentityCard(data, id) {
    return await this.IdentityCardModel.update(data, {
      where: { id },
    });
  }
  async deleteIdentityCard(id) {
    return await this.IdentityCardModel.destroy({
      where: { id },
    });
  }
}
module.exports = IdentityCardRepository;
