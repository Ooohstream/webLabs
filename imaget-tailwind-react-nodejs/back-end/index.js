require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

const sequelize = require("./database/index");

sequelize
  .authenticate()
  .then(() => console.log("Postgres connection has been established"))
  .catch((err) =>
    console.log("Posgres connection has not been established", err)
  );

app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(cors({ credentials: true, origin: "*" }));

app.use(express.json());

app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("This is an API for Imaget");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
