const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const URL = process.env.DB_CONNECTION;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully !!");
  })
  .catch((error) => {
    console.log("Database connection failed !! " + error);
  });
