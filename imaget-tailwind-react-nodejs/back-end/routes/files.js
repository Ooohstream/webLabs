const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const FileModel = require("../database/Models/FileModel");
const CategoryModel = require("../database/Models/CategoryModel");
const UserModel = require("../database/Models/UserModel");

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
      include: [{ model: CategoryModel }, { model: UserModel }],
      limit: 100,
    });
  }

  if (req.query?.searchTerm) {
    files = await FileModel.findAll({
      include: [{ model: CategoryModel }, { model: UserModel }],
      limit: 100,
    });
    files = files.filter(
      (file) =>
        file
          .getDataValue("display_name")
          .toLocaleLowerCase()
          .includes(req.query.searchTerm.toLocaleLowerCase()) ||
        file
          .getDataValue("category")
          .getDataValue("name")
          .toLocaleLowerCase()
          .includes(req.query.searchTerm.toLocaleLowerCase()) ||
        file
          .getDataValue("type")
          .toLocaleLowerCase()
          .includes(req.query.searchTerm.toLocaleLowerCase())
    );
  }

  if (Object.keys(req.query).length === 0) {
    files = await FileModel.findAll({
      limit: 100,
      include: [{ model: CategoryModel }, { model: UserModel }],
    });
  }

  const fileInfoArray = files.map((file) => ({
    fileRef: `http://localhost:5000${file.getDataValue(
      "dir"
    )}/${file.getDataValue("name")}.${file.getDataValue("type")}`,
    fileName: file.getDataValue("display_name"),
    posterFirstName: file.getDataValue("user").getDataValue("first_name"),
    posterLastName: file.getDataValue("user").getDataValue("last_name"),
    addedAt: file.getDataValue("createdAt"),
    category: file.getDataValue("category").getDataValue("name"),
    type: file.getDataValue("type"),
  }));

  setTimeout(() => {
    res.status(200).json(fileInfoArray);
  }, 1000);
});

module.exports = router;
