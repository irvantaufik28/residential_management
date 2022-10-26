const { IdentityCard } = require("../models");
const Op = require('sequelize').Op

class IdentityCardRepository {
  constructor() {
    this.IdentityCardModel = IdentityCard;
  }
  async getIdentityCardById( id ) {
    return await this.IdentityCardModel.findOne({
      where: { id },
    });
  }
  async getIdentityCardByUserId(id) {
    return await this.IdentityCardModel.findAll({
      where: { userId : id},
    });
  }

  async getIdentityCardBySerialNo(serialNo) {
    return await this.IdentityCardModel.findOne({
      where: { serialNo },
    });
  }
  
  
  async getIdentityCardByCardType(card_type) {
    return await this.IdentityCardModel.findAll({
      where : {
        card_type: {
          [Op.eq]: card_type
        }
      }
    })
  }
  async createCard(IdentityCardData) {
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
