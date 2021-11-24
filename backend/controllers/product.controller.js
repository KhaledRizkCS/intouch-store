const { Product, Review } = require("../models");
const faker = require("faker");

// Retrieve all products from the database with their reviews.
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Review, as: "reviews" }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve a specific product from the database with its reviews.
exports.findOne = async (req, res) => {
  console.log(faker.commerce.price());
  try {
    const products = await Product.findByPk(req.params.id, {
      include: [{ model: Review, as: "reviews" }],
    });
    if (products) res.json(products);
    else res.status(404).json("There is not product with this id.");
  } catch (err) {
    res.status(500).json(err);
  }
};
