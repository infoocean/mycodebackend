const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//require models
const userregistration = require("../../Models/UserModels/usermodels");
// user registration controller
const UserRegistrationController = async (req, res) => {
  const secure_password = await bcrypt.hash(req.body.password, 12);
  const secure_confirmpassword = await bcrypt.hash(
    req.body.confirmpassword,
    12
  );
  const data = new userregistration({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    number: req.body.number,
    password: secure_password,
    confirmpassword: secure_confirmpassword,
  });

  try {
    const check_email = await userregistration.findOne({
      email: req.body.email,
    });
    if (check_email !== null) {
      return res.status(200).send({ message: "email allready exists" });
    }
    const savedata = await data.save();
    res.status(201).send({ message: "data save successfully", savedata });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//user login controller
const UserLoginController = async (req, res) => {
  try {
    const email = req.body.email;

    // const password = req.body.password;
    // const secpass = await bcrypt.hash(password, 12);
    // //console.log(secpass);
    // const user = await userregistration.findOne({
    //   email: email,
    //   password: secpass,
    // });
    // console.log(user);
    // return false;

    const isuser = await userregistration.findOne({
      email: email,
    });
    //console.log(isuser);
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

//get all users
const UserData = async (req, res) => {
  try {
    const users = await userregistration
      .find()
      .select(["-password", "-confirmpassword", "-tokens"]);
    if (users) {
      res.status(200).send({ message: "ok", data: users });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  UserRegistrationController,
  UserLoginController,
  UserData,
};
