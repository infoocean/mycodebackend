const express = require("express");
const app = express();
const router = express.Router();

//require controlers
const {
  UserRegistration,
  UserLogin,
} = require("../Controllers/LoginRegistration/LoginRegistration");

const {
  WybritUserRegistration,
  WybritUserLogin,
} = require("../Controllers/WybritController/wybrituserregistration");

//routes
router.get("/signup", (req, res) => {});
router.get("/login", (req, res) => {});

//wybrit app api login regfistration
router.post("/wybrituserregistration", WybritUserRegistration);
router.post("/wybrituserlogin", WybritUserLogin);

module.exports = router;
