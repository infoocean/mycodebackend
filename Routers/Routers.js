const express = require("express");
const router = express.Router();

const {
  UserRegistrationController,
  UserLoginController,
  UserData,
} = require("../Controllers/UserControllers/usercontrollers");
const verifyToken = require("../Middlewares/auth");

//routes
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", UserLoginController);
router.get("/userdata", verifyToken, UserData);

module.exports = router;
