const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");

const FileModel = sequelize.define("files", {
  name: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  display_name: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  dir: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
});

module.exports = FileModel;
