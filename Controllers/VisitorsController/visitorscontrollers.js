const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");
//require models
const visitorsmodel = require("../../Models/visitormodel/visitormodel");

// visitor registration controller
const visitorregistrationcontroller = async (req, res) => {
  const { name, email, age, address, purposetovisit, checkindatetime } =
    req.body;
  if (
    !name ||
    !email ||
    !age ||
    !address ||
    !purposetovisit ||
    !checkindatetime
  ) {
    return res.status(400).send({ message: "all feild is required" });
  }
  const visitordata = new visitorsmodel({
    name: name,
    email: email,
    age: age,
    address: address,
    purposetovisit: purposetovisit,
    checkindatetime: checkindatetime,
  });
  try {
    const check_email = await visitorsmodel.findOne({
      email: email,
    });
    if (check_email !== null) {
      return res.status(200).send({ message: "email allready registred " });
    }
    const savedata = await visitordata.save();
    const send_visitor_data = {
      name: savedata.name,
      email: savedata.email,
      age: savedata.age,
      address: savedata.address,
      purposetovisit: savedata.purposetovisit,
      checkindatetime: savedata.checkindatetime,
    };
    res
      .status(201)
      .send({ message: "data save successfully", data: send_visitor_data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// visitor update controller
const visitorupdatecontroller = async (req, res) => {
  const _id = req.params.id;
  const updatedta = req.body;
  try {
    const queryupdatedata = await visitorsmodel.findByIdAndUpdate(
      _id,
      updatedta,
      { new: true }
    );
    //console.log(queryupdatedata);
    res.status(202).send({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//visitor login controller
// const visitorlogincontroller = async (req, res) => {
//   const { email, username, password } = req.body;
//   try {
//     const isuser = await visitorsmodel.findOne({
//       email: email,
//     });

//     if (isuser !== null) {
//       const is_password_match = await bcrypt.compare(
//         req.body.password,
//         isuser.password
//       );
//       if (is_password_match === true) {
//         const jwt_token = await isuser.generateAuthToken();
//         //console.log(jwt_token);
//         //set token in cookies
//         res.cookie("jwt_auth_shub_token", jwt_token, {
//           httpOnly: true,
//         });
//         res
//           .status(200)
//           .send({ message: "user login successfully", token: jwt_token });
//       } else {
//         res.status(400).json({ error: "invalid email or password" });
//       }
//     } else {
//       res.status(400).json({ error: "invalid crendentials" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

//get all visitors controllers
const getvisitscontroller = async (req, res) => {
  try {
    const visitors = await visitorsmodel.find();
    //console.log(visitors.length);
    //return false;
    if (visitors.length > 0) {
      res.status(200).send({ message: "ok", data: visitors });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//get visitordetbyid controller
const getvisitsbyidcontroller = async (req, res) => {
  //console.log(req.params.id);
  //return false;
  try {
    const visitorsdet = await visitorsmodel.find({ _id: req.params.id });
    //console.log(visitorsdet);
    if (visitorsdet) {
      res.status(200).send({ message: "ok", data: visitorsdet });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//generate qr code
const generateqrcodevisitorcontroller = async (req, res) => {
  //console.log(req.params.id);
  try {
    myvisitordata = await visitorsmodel.findOne({ _id: req.params.id });
    if (myvisitordata) {
      const myqrdata = await QRCode.toDataURL(myvisitordata.name);
      res.status(200).send({ data: myqrdata });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  visitorregistrationcontroller,
  // visitorlogincontroller,
  getvisitscontroller,
  getvisitsbyidcontroller,
  visitorupdatecontroller,
  generateqrcodevisitorcontroller,
};
