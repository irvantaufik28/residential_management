const bcrypt = require("bcrypt")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Roles", [
            {
                name: "admin",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "warga",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Roles", null, {})
    }
}