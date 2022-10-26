const { Relationship } = require("../models");
class RelationshipRepository {
  constructor() {
    this.RelationshipModel = Relationship
  }
  async createRelationship(data) {
    return await this.RelationshipModel.create(data);
  }
  async updateRelationship(data, id) {
    return await this.RelationshipModel.update(data, {
      where: { id },
    });
  }
  async deleteRelationship(id) {
    return await this.RelationshipModel.destroy({
      where: { id },
    });
  }
}
module.exports = RelationshipRepository;
