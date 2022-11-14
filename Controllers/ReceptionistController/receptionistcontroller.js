const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//require models
const Receptionistmodel = require("../../Models/ReceptionistModel/receptionistmodel");

// eceptionist registration controller
const receptionistregistrationcontroller = async (req, res) => {
  //console.log(req.body);
  const {
    firstname,
    lastname,
    username,
    number,
    email,
    password,
    confirmpassword,
    dob,
    age,
    address1,
    address2,
    city,
    state,
    country,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !number ||
    !email ||
    !password ||
    !confirmpassword ||
    !username ||
    !dob ||
    !age
  ) {
    return res.status(400).send({ message: "all feild is required" });
  }

  //password bycript
  const secure_password = await bcrypt.hash(password, 12);
  const secure_confirmpassword = await bcrypt.hash(confirmpassword, 12);

  const receptionistdata = new Receptionistmodel({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    number: number,
    password: secure_password,
    confirmpassword: secure_confirmpassword,
    dob: dob,
    age: age,
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    country: country,
  });

  try {
    const check_email = await Receptionistmodel.findOne({
      email: email,
    });
    if (check_email !== null) {
      return res
        .status(200)
        .send({ message: "email allready registred please login" });
    }
    const savedata = await receptionistdata.save();
    const send_Receptionist_data = {
      firstname: savedata.firstname,
      lastname: savedata.lastname,
      email: savedata.email,
      number: savedata.number,
    };
    res.status(201).send({
      message: "data save successfully",
      data: send_Receptionist_data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//receptionist login controller
const receptionistlogincontroller = async (req, res) => {
  //console.log(req.body);
  const { usernameemail, password } = req.body;
  try {
    const isuser = await Receptionistmodel.findOne({
      $or: [{ email: usernameemail }, { username: usernameemail }],
    });
    //console.log(isuser);
    //return false;
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

//get all receptionist controllers
const getreceptionistcontroller = async (req, res) => {
  try {
    const visitors = await Receptionistmodel.find().select([
      "-password",
      "-confirmpassword",
      "-tokens",
    ]);
    console.log(visitors.length);
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

module.exports = {
  receptionistregistrationcontroller,
  receptionistlogincontroller,
  getreceptionistcontroller,
};
