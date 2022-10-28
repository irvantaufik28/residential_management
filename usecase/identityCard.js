class indentityCard {
  constructor(IdentityCardRepository, UserRepository, card_type, _) {
    this.IdentityCardRepository = IdentityCardRepository;
    this.UserRepository = UserRepository;
    this.card_type = card_type;
    this._ = _;
  }

  async getIdentityCardId(id) {
    let result = {
      isSuccess: false,
      status: 404,
      reason: null,
      data: null,
    };

    const identityCard = await this.IdentityCardRepository.getIdentityCardById(
      id
    );
    if (identityCard === null) {
      result.reason = "identity card not found";
      return result;
    }
    const user = await this.UserRepository.getUserById(identityCard.userId);
    if (user === null) {
      result.reason = "user not found, shometing went wrong";
      return result;
    }
    const detialData = {
      identityCard: identityCard,
      user: user,
    };

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

    const indentityCard =
      await this.IdentityCardRepository.getIdentityCardByUserId(userId);

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

    const indentityCard =
      await this.IdentityCardRepository.getIdentityCardByCardType(card_type);
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
    }
    result.isSuccess = true;
    result.status = 200;
    result.data = indentityCard;
    return result;
  }

  async createCard(data) {
    let result = {
      isSuccess: false,
      status: 400,
      reason: null,
      data: null,
    };
    const userCard = await this.IdentityCardRepository.getIdentityCardByUserId(
      data.userId
    );
    for (let i = 0; i < userCard.length; i++) {
      if (userCard[i].card_type === data.card_type) {
        result.reason = `failed, cannot add ${data.card_type} more than one`;
        return result;
      }
    }
    const existCard =
      await this.IdentityCardRepository.getIdentityCardBySerialNo(
        data.serialNo
      );
    if (existCard !== null) {
      result.reason = `failed, ${data.card_type} already registered`;
      return result;
    }
    const indentityCard = await this.IdentityCardRepository.createCard(data);
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

    const indentityCard = await this.IdentityCardRepository.getIdentityCardById(
      id
    );
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
      return result;
    }
    const existCard =
      await this.IdentityCardRepository.getIdentityCardBySerialNo(
        indentityCardData.serialNo
      );
    if (existCard !== null) {
      result.reason = "failed, card already registered";
      result.status = 400;
      return result;
    }
    const newindentityCard =
      await this.IdentityCardRepository.updateIdentityCard(
        indentityCardData,
        id
      );
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
    let indentityCard = await this.IdentityCardRepository.getIdentityCardById(
      id
    );
    if (indentityCard === null) {
      result.reason = "indentityCard not found";
      return result;
    }
    const setToUnRegistered = {
      isRegistered : false,
    }
    
    await this.UserRepository.updateUser(setToUnRegistered, indentityCard.userId)
    await this.IdentityCardRepository.deleteIdentityCard(id);
    result.isSuccess = true;
    result.status = 204;
    return result;
  }
}

module.exports = indentityCard;
