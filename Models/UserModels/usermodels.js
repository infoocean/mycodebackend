const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserRegistrationSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  },
});

const userregistration = new mongoose.model("Users", UserRegistrationSchema);
module.exports = userregistration;
