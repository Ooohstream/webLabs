const express = require("express");
const UserModel = require("../database/Models/UserModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/add", async (req, res) => {
  const emailExist = await UserModel.findOne({
    where: { email: req.body.user.email },
  });

  if (!emailExist) {
    const newUser = UserModel.build({
      first_name: req.body.user.firstName,
      last_name: req.body.user.lastName,
      email: req.body.user.email,
      password: req.body.user.password,
    });
    await newUser
      .save()
      .then(
        res.status(200).json({
          accessToken: jwt.sign(
            {
              user_id: newUser.getDataValue("id"),
              first_name: req.body.user.firstName,
              last_name: req.body.user.lastName,
              email: req.body.user.email,
            },
            process.env.SECRET_KEY
          ),
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
      });
  } else {
    res.status(409).json({ error: "User with this email already exists" });
  }
});

router.get("/login", async (req, res) => {
  const userExists = await UserModel.findOne({
    where: { email: req.query.email },
  });

  if (userExists) {
    if (
      bcrypt.compareSync(
        req.query.password,
        userExists.getDataValue("password")
      )
    ) {
      return res.status(200).json({
        accessToken: jwt.sign(
          {
            user_id: userExists.getDataValue("id"),
            first_name: userExists.getDataValue("first_name"),
            last_name: userExists.getDataValue("last_name"),
            email: userExists.getDataValue("email"),
          },
          process.env.SECRET_KEY
        ),
      });
    } else {
      return res.status(401).json({ error: "Wrong password!" });
    }
  } else {
    return res.status(404).json({ error: "User doesn't exist!" });
  }
});

module.exports = router;
