const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");

/**
 * @swagger
 * /api/products:
 *  get:
 *    description: Retrieve all products from the database with their reviews.
 *    responses:
 *      '200':
 *        description: Success
 *      '500':
 *        description: Server error
 */
router.get("/products", productController.findAll);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    description: Retrieve a specific product from the database with its reviews
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the product to retrieve.
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: A product object.
 *      '404':
 *        description: There is no product with this id.
 *      '500':
 *        description: Server error
 *
 */
router.get("/products/:id", productController.findOne);

module.exports = router;
