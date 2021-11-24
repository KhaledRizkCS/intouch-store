"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let productArray = [];
    // this url returns a different image each time it loads
    let image = "https://picsum.photos/640/480";

    // generating an array of 6 random products
    for (let i = 0; i < 6; i++) {
      productArray.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: image,
      });
    }

    await queryInterface.bulkInsert("Products", productArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null);
  },
};
