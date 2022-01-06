const Sequelize = require("sequelize");

const sequelize = require("../index");

const FileModel = sequelize.define("files", {});

module.exports = FileModel;
