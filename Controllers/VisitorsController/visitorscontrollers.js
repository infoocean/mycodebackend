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

//get visitordet byid controller
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

//get recent checking visitor controller
const getrecentcheckingvisitors = async (req, res) => {
  // const curr_date = new Date();
  // let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
  //   curr_date
  // );
  // let month = new Intl.DateTimeFormat("en", { month: "short" }).format(
  //   curr_date
  // );
  // let date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
  //   curr_date
  // );
  // var mycurdate = `${date} ${month} ${year}`;
  // var makeDate = new Date(mycurdate);
  // console.log("Original date: ", makeDate.toString());
  // makeDate.setMonth(makeDate.getMonth() - 1);
  // //console.log("current date ", curr_date.toLocaleDateString());
  // //console.log("1 month previous  date ", makeDate.toLocaleDateString());
  // const currdt = curr_date.toLocaleDateString();
  // const prev1mtdt = makeDate.toLocaleDateString();

  try {
    const recent_visitor = await visitorsmodel.aggregate([
      { $sort: { checkindatetime: -1 } },
      { $limit: 10 },
    ]);
    if (recent_visitor) {
      res.status(200).send({ message: "ok", recent_visitor });
    } else {
      res.status(400).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
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

//visitor searching api
const visitorsearchingcontroller = async (req, res) => {
  //console.log(req.query);
  //console.log(req.query["name"]);
  let query = [];
  if (req.query["name"]) {
    query.push({ name: req.query["name"] });
  }
  if (req.query["email"]) {
    query.push({ email: req.query["email"] });
  }
  if (req.query["status"]) {
    query.push({ status: req.query["status"] });
  }
  console.log(query);
  try {
    const data = await visitorsmodel.find({
      $and: query,
    });
    console.log(data);
    if (data.length > 0) {
      res.status(200).send({ message: "ok", data });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {}
};

module.exports = {
  visitorregistrationcontroller,
  // visitorlogincontroller,
  getvisitscontroller,
  getvisitsbyidcontroller,
  visitorupdatecontroller,
  generateqrcodevisitorcontroller,
  visitorsearchingcontroller,
  getrecentcheckingvisitors,
};
