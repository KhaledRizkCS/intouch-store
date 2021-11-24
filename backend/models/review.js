"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.userId = this.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }

  // initialization of the Review model
  Review.init(
    {
      body: DataTypes.STRING,
      rating: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
