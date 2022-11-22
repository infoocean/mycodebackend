const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//require models
const superadminmodel = require("../../Models/SuperAdminModel/superadmin");

// super admin registration controller
const superadminregistrationcontroller = async (req, res) => {
  const { name, email, number, password } = req.body;
  if (!name || !number || !email || !password) {
    return res.status(400).send({ message: "all feild is required" });
  }
  //password bycript
  const secure_password = await bcrypt.hash(password, 12);
  const admindata = new superadminmodel({
    name: name,
    email: email,
    number: number,
    password: secure_password,
  });

  try {
    const check_email = await superadminmodel.findOne({
      email: email,
    });
    if (check_email !== null) {
      return res
        .status(400)
        .send({ message: "email allready registred please login" });
    }
    const savedata = await admindata.save();
    const send_admin_data = {
      name: savedata.name,
      email: savedata.email,
    };
    res
      .status(201)
      .send({ message: "data save successfully", data: send_admin_data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//super admin login controller
const superadminlogincontroller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "all feild is required" });
  }
  try {
    const isuser = await superadminmodel.findOne({
      email: email,
    });
    if (isuser !== null) {
      const is_password_match = await bcrypt.compare(password, isuser.password);
      if (is_password_match === true) {
        const token = jwt.sign(
          { email: email, password: password },
          process.env.JWT_SECRET_KEY
        );
        //console.log(token);
        if (token) {
          res.status(200).json({
            success: "login successfully",
            message:
              "Authorization successful! this token use for all rest api request",
            token: token,
          });
        }
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

module.exports = {
  superadminregistrationcontroller,
  superadminlogincontroller,
};
