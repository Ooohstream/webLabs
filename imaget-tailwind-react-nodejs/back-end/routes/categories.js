const express = require("express");
const router = express.Router();
const CategoryModel = require("../database/Models/CategoryModel");

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

module.exports = router;
