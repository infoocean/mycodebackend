//require models
const userregistration = require("../../Models/Wybritappusers/UserRegistration");
// user registration controller
const WybritUserRegistration = async (req, res) => {
  const data = new userregistration({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
    address1: req.body.address1,
    address2: req.body.address2,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
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
const WybritUserLogin = async (req, res) => {
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
  WybritUserRegistration,
  WybritUserLogin,
};
