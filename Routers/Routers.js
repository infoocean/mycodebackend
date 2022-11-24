const express = require("express");
const router = express.Router();

//##########################################   REQUIRE MIDDLEWARES  ##########################
//authorization middlewar
const { verifyAuthToken } = require("../Middlewares/auth");
//aunthontication middleware
const { verifyLoginAuthToken } = require("../Middlewares/loginauthtoken");
//upload image
const uploads = require("../Middlewares/uploadmulter");

//##########################################################################################
//#                                    REQUIRE CONTROLLERS                                 #
//##########################################################################################

//########################################## Receptionist controllers  #######################
const {
  receptionistregistrationcontroller,
  receptionistlogincontroller,
  getreceptionistcontroller,
  getreceptionistbyidcontroller,
  updatereceptionistcontroller,
  deletereceptionistcontroller,
  getreceptionistbytoken,
  changepassword,
  profileimgupload,
} = require("../Controllers/ReceptionistController/receptionistcontroller");

//########################################## Visitors controllers   ########################
const {
  visitorregistrationcontroller,
  getvisitscontroller,
  getvisitsbyidcontroller,
  visitorupdatecontroller,
  visitordeletecontroller,
  visitorsearchingcontroller,
  getrecentcheckingvisitors,
  generateqrcodevisitorcontroller,
} = require("../Controllers/VisitorsController/visitorscontrollers");

//#########################################   User controllers  ############################
const {
  UserRegistrationController,
  UserLoginController,
  UserData,
} = require("../Controllers/UserControllers/usercontrollers");

//#########################################  Super admin controller  #######################
const {
  superadminregistrationcontroller,
  superadminlogincontroller,
} = require("../Controllers/SuperAdminController/superadmincontroller");

//########################################   Send email controller   #######################
const {
  sendmailcontroller,
  sendresetpassemailcontroller,
  setnewpassword,
} = require("../Controllers/SendmailController/sendmailcontroller");

//##########################################################################################
//#                                    ROUTERS                                             #
//##########################################################################################

//#######################################  receptionist routers    #########################
router.post(
  "/receptionistregistration",
  verifyAuthToken,
  receptionistregistrationcontroller
);
router.post("/receptionistlogin", verifyAuthToken, receptionistlogincontroller);
router.get("/getreceptionist", verifyAuthToken, getreceptionistcontroller);
router.get(
  "/getceptionist/:id",
  verifyAuthToken,
  getreceptionistbyidcontroller
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
  "/getreceptionistbytoken/:login_token",
  verifyAuthToken,
  getreceptionistbytoken
);

router.put("/profileimgupload/:id", uploads.single("image"), profileimgupload);

router.post("/setnewpassword/:id", setnewpassword);

router.post("/changepassword/:id", changepassword);

//#########################################  visitors routers ################################
router.post(
  "/visitorregistration",
  verifyAuthToken,
  visitorregistrationcontroller
);
router.get("/getvisitors", verifyAuthToken, getvisitscontroller);
router.get("/getvisitorbyid/:id", verifyAuthToken, getvisitsbyidcontroller);
router.patch("/editvisitor/:id", verifyAuthToken, visitorupdatecontroller);
router.delete("/deletevisitor/:id", verifyAuthToken, visitordeletecontroller);
router.get(
  "/getrecentcheckingvisitors",
  verifyAuthToken,
  getrecentcheckingvisitors
);
router.post("/searchvisitor", verifyAuthToken, visitorsearchingcontroller);

//########################################### generate auth token routes   ####################
//super admin router
router.post("/superadminreg", superadminregistrationcontroller);
//super admin login and generate auth token
router.post("/generateauthtoken", superadminlogincontroller);

//###########################################  user router  ###################################
router.post("/usersignup", UserRegistrationController);
router.post("/userlogin", verifyAuthToken, UserLoginController);
router.get("/userdata", verifyAuthToken, UserData);

//##########################################   generate qrcode controller  ####################
router.post("/generateqrcodevisitor/:id", generateqrcodevisitorcontroller);

//##########################################   send mail router   #############################
router.post("/sendmail", sendmailcontroller);
//########################################## send password reset link email router  #######
router.post(
  "/sendresetpasswordemail",
  verifyAuthToken,
  sendresetpassemailcontroller
);

module.exports = router;
