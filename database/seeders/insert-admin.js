const bcrypt = require("bcrypt")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                username: "irvan28",
                firstName: "irvan",
                lastName: "taufik",
                headOfFamily : true,
                birth : new Date("1994/08/07"),
                isMale : true,
                isMarried : true,
                email: "irvan@email.com",
                password: bcrypt.hashSync('123456', 10),
                phone: 082311552,
                homeId : 1,
                job : "programmer",
                roleId: 1,
                isRegistered : true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {})
    }
}