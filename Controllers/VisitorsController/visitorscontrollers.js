const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//require models
const visitorsmodel = require("../../Models/visitormodel/visitormodel");

// visitor registration controller
const visitorregistrationcontroller = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    number,
    email,
    password,
    confirmpassword,
    dateofbirth,
    age,
    addressofarea,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !number ||
    !email ||
    !password ||
    !confirmpassword ||
    !username ||
    !dateofbirth ||
    !age ||
    !addressofarea
  ) {
    return res.status(400).send({ message: "all feild is required" });
  }

  //password bycript
  const secure_password = await bcrypt.hash(password, 12);
  const secure_confirmpassword = await bcrypt.hash(confirmpassword, 12);

  const visitordata = new visitorsmodel({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    number: number,
    password: secure_password,
    confirmpassword: secure_confirmpassword,
    dateofbirth: dateofbirth,
    age: age,
    addressofarea: addressofarea,
  });

  try {
    const check_email = await visitordata.findOne({
      email: email,
    });
    if (check_email !== null) {
      return res
        .status(400)
        .send({ message: "email allready registred please login" });
    }
    const savedata = await visitordata.save();
    const send_visitor_data = {
      firstname: savedata.firstname,
      lastname: savedata.lastname,
      email: savedata.email,
      number: savedata.number,
    };
    res
      .status(201)
      .send({ message: "data save successfully", data: send_visitor_data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//visitor login controller
const visitorlogincontroller = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const isuser = await visitorsmodel.findOne({
      email: email,
    });

    if (isuser !== null) {
      const is_password_match = await bcrypt.compare(
        req.body.password,
        isuser.password
      );
      if (is_password_match === true) {
        const jwt_token = await isuser.generateAuthToken();
        //console.log(jwt_token);
        //set token in cookies
        res.cookie("jwt_auth_shub_token", jwt_token, {
          httpOnly: true,
        });
        res
          .status(200)
          .send({ message: "user login successfully", token: jwt_token });
      } else {
        res.status(400).json({ error: "invalid email or password" });
      }
    } else {
      res.status(400).json({ error: "invalid crendentials" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get all visitors controllers
const getvisitscontroller = async (req, res) => {
  try {
    const visitors = await visitorsmodel
      .find()
      .select(["-password", "-confirmpassword", "-tokens"]);
    console.log(visitors.length);
    return false;
    if (visitors.length >= 0) {
      res.status(200).send({ message: "ok", data: visitors });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  visitorregistrationcontroller,
  visitorlogincontroller,
  getvisitscontroller,
};
