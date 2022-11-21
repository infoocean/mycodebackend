const jwt = require("jsonwebtoken");
const Receptionistmodel = require("../Models/ReceptionistModel/receptionistmodel");
const acces_data_secret_key = process.env.JWT_SECRET_KEY;

const verifyLoginAuthToken = async (req, res, next) => {
  const loginauthtoken = req.cookies.jwttoken;
  console.log("hii");
  console.log(loginauthtoken);
  try {
    const verifytoken = jwt.verify(loginauthtoken, acces_data_secret_key);
    //console.log(verifytoken);
    const recepionist = await Receptionistmodel.findOne({
      _id: loginauthtoken._id,
      "tokens.token": loginauthtoken,
    });
    if (!recepionist) {
      throw new Error("user not found");
    } else {
      req.token = loginauthtoken;
      req.user = recepionist;
      req.recepionistid = recepionist._id;
      next();
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = { verifyLoginAuthToken };
