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
    const detail = JSON.parse(fs.readFileSync("./userDetail.json", "utf-8"))
    detail.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("UserDetails", detail)
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("UserDetails", null)
  }
};
