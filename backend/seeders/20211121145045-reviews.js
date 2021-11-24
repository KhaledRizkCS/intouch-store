"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let reviewsArray = [];

    // generating an random number of reviews for each product
    for (let i = 1; i < 7; i++) {
      let numberOfReviews = Math.floor(Math.random() * 6);
      for (let j = 0; j < numberOfReviews; j++)
        reviewsArray.push({
          productId: i,
          body: faker.lorem.sentence(),
          rating: Math.floor(Math.random() * 6),
        });
    }
    await queryInterface.bulkInsert("Reviews", reviewsArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null);
  },
};
