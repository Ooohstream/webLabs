require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
require("./database/init");
const fileUpload = require("express-fileupload");

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
app.use("/categories", require("./routes/categories"));

app.get("/", (req, res) => {
  res.send("This is an API for Imaget");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
