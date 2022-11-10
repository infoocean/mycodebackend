const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  UserRegistrationController,
  UserLoginController,
  UserData,
} = require("../Controllers/UserControllers/usercontrollers");
const verifyToken = require("../Middlewares/auth");

//routes
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", verifyToken, UserLoginController);
router.get("/userdata", verifyToken, UserData);

router.get("/generateapitoken", (req, res) => {
  //console.log(req.body);
  const { username, password } = req.body;
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY);
  //console.log(token);
  if (token) {
    res.status(200).json({
      success: true,
      message: "Authentication successful!",
      token: token,
    });
  }
});

module.exports = router;
