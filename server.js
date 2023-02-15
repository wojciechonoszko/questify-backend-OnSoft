const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const apiRouter = require("./api/index");
const PORT = process.env.PORT || 8080;
const uriDb = process.env.URI_DB;


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./api/config-passport")


app.use("/", apiRouter);
app.get('/', (req, res) => {
  res.send("Welcome to Questify in Heroku!!")
})
app.use((_, res, __) => {
  res.status(404).json({
message: "Not found!",
  });
});

app.use((err, _, ___) => {
  console.log(err.stack);
  res.status(500).json({
  message:err.message
  });
});

mongoose.set('strictQuery', true);

const connection = mongoose.connect(uriDb, {
});

connection
    .then(() => {
        app.listen(PORT, function () {
        console.log(`Server running, Use our API on port: ${PORT}`)
    })
    })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })