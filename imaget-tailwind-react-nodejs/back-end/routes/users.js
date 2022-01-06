const express = require("express");
const { route } = require("express/lib/application");
const UserModel = require("../database/Models/UserModel");
const router = express.Router();

router.get("/", (req, res) => {
  UserModel.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.send("There was some error getting users", err));
});

router.post("/add", (req, res) => {
  const newUser = UserModel.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });
  res.send("users/add");
});

router.get("/login", (req, res) => {
  res.send("users/login");
});

module.exports = router;
