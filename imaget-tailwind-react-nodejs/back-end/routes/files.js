const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const FileModel = require("../database/Models/FileModel");

router.post("/upload", verify, async (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).json({ error: "No file were chosen!" });
    }
    const newImage = req.files.file;
    const type = newImage.mimetype.substr(
      newImage.mimetype.indexOf("/") + 1,
      newImage.mimetype.length
    );
    const newFile = FileModel.build({
      display_name: req.body.filename,
      type,
      dir: "/uploads",
      size: newImage.size,
      categoryId: req.body.categoryId,
      userId: req.user.user_id,
    });
    await newImage.mv(
      `.${newFile.getDataValue("dir")}/${newFile.getDataValue(
        "name"
      )}.${newFile.getDataValue("type")}`
    );
    await newFile.save();
    return res.status(201).json("success!");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  let files;

  if (req?.query?.categoryId) {
    files = await FileModel.findAll({
      where: { categoryId: req.query.categoryId },
      limit: 100,
    });
  } else {
    files = await FileModel.findAll({ limit: 100 });
  }

  res
    .status(200)
    .json(
      files.map(
        (file) =>
          `http://localhost:5000${file.getDataValue("dir")}/${file.getDataValue(
            "name"
          )}.${file.getDataValue("type")}`
      )
    );
});

module.exports = router;
