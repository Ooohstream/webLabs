const sequelize = require("./dbConfig");

const UserModel = require("./Models/UserModel");
const FileModel = require("./Models/FileModel");
const CategoryModel = require("./Models/CategoryModel");

CategoryModel.hasMany(FileModel);
FileModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

UserModel.hasMany(FileModel);
FileModel.belongsTo(UserModel, { foreignKey: "userId" });

const init = async () => {
  //   await CategoryModel.create({
  //     name: "Wallpapers",
  //   });
  //   await CategoryModel.create({
  //     name: "Nature",
  //   });
  //   await CategoryModel.create({
  //     name: "Fashion",
  //   });
  //   await CategoryModel.create({
  //     name: "3D Renders",
  //   });
  //   await CategoryModel.create({
  //     name: "Achitecture",
  //   });
  //   await CategoryModel.create({
  //     name: "Film",
  //   });
  //   CategoryModel.create({
  //     name: "People",
  //   });
  await sequelize.sync();
};

init();
