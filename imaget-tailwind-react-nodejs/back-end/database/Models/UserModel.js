const Sequelize = require("sequelize");

const sequelize = require("../index");

const UserModel = sequelize.define("users", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = UserModel;
