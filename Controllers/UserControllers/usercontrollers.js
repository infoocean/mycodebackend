//require models
const userregistration = require("../../Models/UserModels/usermodels");
// user registration controller
const UserRegistrationController = async (req, res) => {
  const data = new userregistration({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  });
  try {
    const savedata = await data.save();
    res.status(201).send({ message: "data save successfully", savedata });
  } catch (error) {
    //console.log(error);
    res.status(400).send({ message: error.message });
  }
};

//user login controller
const UserLoginController = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isuser = await userregistration.findOne({
      email: email,
      password: password,
    });
    //console.log(isuser);
    if (isuser !== null) {
      res.status(200).send({ message: "login successfully", userinfo: isuser });
    } else {
      res.status(400).send({
        message:
          "email or password does not exists enter Valid Email or password",
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  UserRegistrationController,
  UserLoginController,
};
