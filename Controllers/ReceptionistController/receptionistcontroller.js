const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
    postalcode,
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
    postalcode: postalcode,
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
      username: savedata.username,
      email: savedata.email,
      number: savedata.number,
      dob: savedata.dob,
      age: savedata.age,
      address1: savedata.address1,
      address2: savedata.address2,
      city: savedata.city,
      state: savedata.state,
      country: savedata.country,
      postalcode: savedata.postalcode,
      registrationdate: savedata.registrationdate,
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
      const is_password_match = await bcrypt.compare(password, isuser.password);
      if (is_password_match === true) {
        const jwttoken = await isuser.generateAuthToken();
        //console.log(jwttoken);
        //set token in cookies
        res.cookie("jwttoken", jwttoken, {
          maxAge: 7200000, // 2 hours
          secure: false, // set to true if your using https
          httpOnly: true,
        });
        res
          .status(200)
          .send({ message: "user login successfully", token: jwttoken });
      } else {
        res.status(400).json({ error: "invalid crendentials" });
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

//get receptionist by id controller
const getreceptionistbyidcontroller = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const receptionistdata = await Receptionistmodel.findOne({
      _id: id,
    }).select(["-password", "-confirmpassword", "-tokens"]);
    if (receptionistdata !== null) {
      //console.log(deleteadminuserdata);
      res.status(200).send({ message: `ok  successfully`, receptionistdata });
    } else {
      res.status(400).send({ message: `data not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//update receptionist by id  controllers
const updatereceptionistcontroller = async (req, res) => {
  const _id = req.params.id;
  const updatedta = req.body;
  try {
    const queryupdatedata = await Receptionistmodel.findByIdAndUpdate(
      _id,
      updatedta,
      { new: true }
    ).select(["-password", "-confirmpassword", "-tokens"]);
    //console.log(queryupdatedata);
    if (queryupdatedata !== null) {
      res
        .status(202)
        .send({ message: "data updated successfully", data: queryupdatedata });
    } else {
      res.status(400).send({
        message:
          "please fill valid details or check user unique id, unique id not match",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete receptionist controllers
const deletereceptionistcontroller = async (req, res) => {
  const id = req.params.id;
  try {
    const deleterecepionistdata = await Receptionistmodel.deleteOne({
      _id: id,
    });
    //console.log(deleterecepionistdata);
    //console.log(deleterecepionistdata.deletedCount);
    if (deleterecepionistdata.deletedCount !== 0) {
      res.status(202).send({ message: `data deleted successfully` });
    } else {
      res
        .status(404)
        .send({ message: `mismatch crendentials please check unique id` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get receptionist by token controller
const getreceptionistbytoken = async (req, res) => {
  //console.log(req.params.login_token);
  try {
    const userdata = await Receptionistmodel.findOne({
      "tokens.token": req.params.login_token,
    }).select(["-tokens", "-password", "-confirmpassword"]);
    //console.log(userdata);
    if (userdata !== null) {
      res.status(200).send({ message: "ok", userdata });
    } else {
      res.status(400).send({ message: "invalid login token" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//change recepoinist password
const changepassword = async (req, res) => {
  const _id = req.params.id;
  const { password, confirmpassword } = req.body;
  const secure_password = await bcrypt.hash(password, 12);
  const secure_confirmpassword = await bcrypt.hash(confirmpassword, 12);

  const updatedta = {
    password: secure_password,
    confirmpassword: secure_confirmpassword,
  };

  try {
    const queryupdatedata = await Receptionistmodel.findByIdAndUpdate(
      _id,
      updatedta,
      { new: true }
    );
    //console.log(queryupdatedata);
    if (queryupdatedata !== null) {
      res.status(202).send({
        message: "Password Change successfully",
      });
    } else {
      res.status(400).send({
        message: "invalid crendfiantial",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//profile img upload
const profileimgupload = async (req, res) => {
  //console.log(req.file);
  //return false;
  //console.log(req.params.id);
  try {
    const queryupdatedata = await Receptionistmodel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        image: req.file.path,
      },
      { new: true }
    ).select(["-password", "-confirmpassword", "-tokens"]);
    //console.log(queryupdatedata);
    if (queryupdatedata !== null) {
      res
        .status(202)
        .send({ message: "image updated successfully", data: queryupdatedata });
    } else {
      res.status(400).send({
        message:
          "please fill valid details or check user unique id, unique id not match",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  receptionistregistrationcontroller,
  receptionistlogincontroller,
  getreceptionistcontroller,
  updatereceptionistcontroller,
  deletereceptionistcontroller,
  getreceptionistbyidcontroller,
  getreceptionistbytoken,
  changepassword,
  profileimgupload,
};
