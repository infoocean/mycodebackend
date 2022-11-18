const express = require("express");
const router = express.Router();

// middlewares
const { verifyAuthToken } = require("../Middlewares/auth");
const { verifyLoginAuthToken } = require("../Middlewares/loginauthtoken");

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
  // visitorlogincontroller,
  getvisitscontroller,
  getvisitsbyidcontroller,
  visitorupdatecontroller,
  generateqrcodevisitorcontroller,
  visitorsearchingcontroller,
  getrecentcheckingvisitors,
  visitordeletecontroller,
} = require("../Controllers/VisitorsController/visitorscontrollers");

//###############################   Receptionist controllers  #######################
const {
  receptionistregistrationcontroller,
  receptionistlogincontroller,
  getreceptionistcontroller,
  updatereceptionistcontroller,
  deletereceptionistcontroller,
  getreceptionistbyidcontroller,
} = require("../Controllers/ReceptionistController/receptionistcontroller");

//###############################   super admin controller  #######################
const {
  superadminregistrationcontroller,
  superadminlogincontroller,
} = require("../Controllers/SuperAdminController/superadmincontroller");

//###################################### send mail controller #######################
const {
  sendmailcontroller,
} = require("../Controllers/SendmailController/sendmailcontroller");

//routes

//user router
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", verifyAuthToken, UserLoginController);
router.get("/userdata", verifyAuthToken, UserData);

//#########################################  visitor router ###############################
router.post(
  "/visitorregistration",
  verifyAuthToken,
  visitorregistrationcontroller
);
// router.post("/visitorlogin", verifyAuthToken, visitorlogincontroller);
router.get("/getvisitors", verifyAuthToken, getvisitscontroller);
router.get("/getvisitorbyid/:id", verifyAuthToken, getvisitsbyidcontroller);
router.delete("/deletevisitor/:id", verifyAuthToken, visitordeletecontroller);
router.patch("/editvisitor/:id", verifyAuthToken, visitorupdatecontroller);
router.post("/searchvisitor", verifyAuthToken, visitorsearchingcontroller);
router.get(
  "/getrecentcheckingvisitors",
  verifyAuthToken,
  getrecentcheckingvisitors
);

//################################### receptionist router #######################
router.post(
  "/receptionistregistration",
  verifyAuthToken,
  receptionistregistrationcontroller
);
router.post("/receptionistlogin", verifyAuthToken, receptionistlogincontroller);
router.get(
  "/getreceptionist",
  //verifyAuthToken,
  verifyLoginAuthToken,
  getreceptionistcontroller
);
router.put(
  "/updatereceptionist/:id",
  verifyAuthToken,
  updatereceptionistcontroller
);
router.delete(
  "/deletereceptionist/:id",
  verifyAuthToken,
  deletereceptionistcontroller
);
router.get(
  "/getceptionist/:id",
  verifyAuthToken,
  getreceptionistbyidcontroller
);

//#########################################   generate auth token   ###############33
//super admin router
router.post("/superadminreg", superadminregistrationcontroller);
//super admin login and generate auth token
router.post("/generateauthtoken", superadminlogincontroller);

//generate qrcode controller
router.post("/generateqrcodevisitor/:id", generateqrcodevisitorcontroller);

//##########################################      send mail router   ########################
router.post("/sendmail", sendmailcontroller);

module.exports = router;
