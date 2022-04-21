'use strict';

const fs = require("fs")

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = JSON.parse(fs.readFileSync("./user.json", "utf-8"))
    user.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Users", user)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null)
  }
};
