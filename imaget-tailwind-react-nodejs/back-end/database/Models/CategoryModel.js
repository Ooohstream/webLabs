const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");

const CategoryModel = sequelize.define("categories", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = CategoryModel;
