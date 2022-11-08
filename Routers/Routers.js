const express = require("express");
const router = express.Router();

const {
  UserRegistrationController,
  UserLoginController,
  UserData,
} = require("../Controllers/UserControllers/usercontrollers");

//routes
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", UserLoginController);

router.get("/userdata", UserData);

module.exports = router;
