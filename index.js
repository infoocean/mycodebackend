const express = require("express");
const app = express();
const body_parser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//dependies middlewares
app.use(express.json());
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT || 4000;

// app.get("/", (req, res) => {
//   res.send("working fine..");
// });

//create server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

//require database file connect db
require("./DB/db.config.connection");

//require routes file
const router = require("./Routers/Routers");
app.use("/", router);
