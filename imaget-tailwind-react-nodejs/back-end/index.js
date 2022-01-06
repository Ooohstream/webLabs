require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

const sequelize = require("./database/index");
const fileUpload = require("express-fileupload");

sequelize
  .authenticate()
  .then(() => console.log("Postgres connection has been established"))
  .catch((err) =>
    console.log("Posgres connection has not been established", err)
  );

app
  .use(
    fileUpload({
      createParentPath: true,
    })
  )
  .use("/uploads", express.static(__dirname + "/uploads"))
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(express.json())
  .use(cors({ credentials: true, origin: "*" }));

app.use("/users", require("./routes/users"));
app.use("/files", require("./routes/files"));

app.get("/", (req, res) => {
  res.send("This is an API for Imaget");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
