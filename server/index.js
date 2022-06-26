const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/conn");
const dotenv = require("dotenv");
const postRoutes = require("./router/posts");
const userRoutes = require("./router/user");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("I am live at " + port);
});
