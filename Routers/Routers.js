const express = require("express");
const router = express.Router();

const {
  UserRegistrationController,
  UserLoginController,
} = require("../Controllers/UserControllers/usercontrollers");

//routes
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", UserLoginController);

module.exports = router;
