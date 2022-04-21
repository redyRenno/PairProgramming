'use strict';

const fs = require("fs")

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const category = JSON.parse(fs.readFileSync("./category.json", "utf-8"))
    category.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Categories", category)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null)
  }
};
