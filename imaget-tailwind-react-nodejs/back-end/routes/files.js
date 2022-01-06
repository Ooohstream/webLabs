const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");
const { v4: uuidv4 } = require("uuid");

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
    newImage.mv(`./uploads/${uuidv4()}.${type}`);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
