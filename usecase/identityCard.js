class indentityCard {
  constructor(IdentityCardRepository, UserRepository, _) {
    this.IdentityCardRepository = IdentityCardRepository;
    this.UserRepository = UserRepository;
    this._ = _;
  }

  async getIdentityCardId(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };
  
    const identityCard = await this.IdentityCardRepository.getIdentityCardById(id);
    if(identityCard === null){
      result.reason = "identity card not found"
      return result
    }
    const user = await this.UserRepository.getUserById(identityCard.userId)
    if(user === null){
      result.reason = "user not found, shometing went wrong"
      return result
    }
    const detialData = {
      identityCard : identityCard,
      user : user
    }
     
    result.isSuccess = true;
    result.status = 200;
    result.data = detialData;
    return result;
  }


  async getIdentityCardByUserId(userId) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: [],
    };


    const indentityCard = await this.IdentityCardRepository.getIdentityCardByUserId(userId);
    
    result.isSuccess = true;
    result.status = 200;
    result.data = indentityCard;
    return result;
  }


  async getIdentityCardByCardType(card_type) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: [],
    };


    const indentityCard = await this.IdentityCardRepository.getIdentityCardByCardType(card_type);
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = indentityCard;
    return result;
  }

  async createIdentityCard(indentityCardData) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };
    const indentityCard = await this.IdentityCardRepository.createIdentityCard(indentityCardData);
    if (indentityCard === null) {
      result.reason = "failed create indentityCard";
      return result;
    }
    result.isSuccess = true;
    result.status = 201;
    result.data = indentityCard;
    return result;
  }

  async updateIdentityCard(indentityCardData, id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };

    const indentityCard = await this.IdentityCardRepository.getIdentityCardById(id);
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
      return result;
    }
    const newindentityCard = await this.IdentityCardRepository.updateIdentityCard(indentityCardData, id);
    result.isSuccess = true;
    result.status = 204;
    result.data = newindentityCard;
    return result;
  }
  
  async deleteIdentityCard(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };
    let indentityCard = await this.IdentityCardRepository.getIdentityCardById(id);
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
      return result;
    }
    await this.IdentityCardRepository.deleteIdentityCard(id);
    result.isSuccess = true;
    result.status = 204;
    return result;
  }
}

module.exports = indentityCard;
