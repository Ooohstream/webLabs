const express = require("express");
const router = express.Router();
const CategoryModel = require("../database/Models/CategoryModel");
const FileModel = require("../database/Models/FileModel");

router.get("/", async (req, res) => {
  const categories = await CategoryModel.findAll();
  res.status(200).json(
    categories.map((category) => {
      return {
        id: category.getDataValue("id"),
        displayName: category.getDataValue("name"),
      };
    })
  );
});

router.get("/statistics", async (req, res) => {
  const categories = await CategoryModel.findAll({
    include: [{ model: FileModel }],
  });

  const data = categories.map((category) => ({
    category: category.getDataValue("name"),
    photosCount: category.getDataValue("files").length,
    color: (() => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    })(),
  }));

  const labels = data.map((category) => category.category);
  const dataArray = data.map((category) => category.photosCount);
  const colors = data.map((category) => category.color);

  res.status(200).json({
    labels: labels,
    data: dataArray,
    backgroundColor: colors,
  });
});

module.exports = router;
