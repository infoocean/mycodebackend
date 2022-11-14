const express = require("express");
const router = express.Router();

// middlewares
const { verifyAuthToken } = require("../Middlewares/auth");

//controllers
//###############################   user controllers  #######################
const {
  UserRegistrationController,
  UserLoginController,
  UserData,
} = require("../Controllers/UserControllers/usercontrollers");

//###############################   visitors controllers  #######################
const {
  visitorregistrationcontroller,
  visitorlogincontroller,
  getvisitscontroller,
} = require("../Controllers/VisitorsController/visitorscontrollers");

//###############################   Receptionist controllers  #######################
const {
  receptionistregistrationcontroller,
  receptionistlogincontroller,
  getreceptionistcontroller,
} = require("../Controllers/ReceptionistController/receptionistcontroller");

//###############################   super admin controller  #######################
const {
  superadminregistrationcontroller,
  superadminlogincontroller,
} = require("../Controllers/SuperAdminController/superadmincontroller");

//routes
//user router
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", verifyAuthToken, UserLoginController);
router.get("/userdata", verifyAuthToken, UserData);

//visitor router
router.post(
  "/visitorregistration",
  verifyAuthToken,
  visitorregistrationcontroller
);
router.post("/visitorlogin", verifyAuthToken, visitorlogincontroller);
router.post("/getvisitors", verifyAuthToken, getvisitscontroller);

//receptionist router
router.post(
  "/receptionistregistration",
  verifyAuthToken,
  receptionistregistrationcontroller
);
router.post("/receptionistlogin", verifyAuthToken, receptionistlogincontroller);
router.get("/getreceptionist", verifyAuthToken, getreceptionistcontroller);

//super admin router
router.post("/superadminreg", superadminregistrationcontroller);
router.post("/superadminlog", superadminlogincontroller);

module.exports = router;
