const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserRegistrationSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
});

const userregistration = new mongoose.model("Users", UserRegistrationSchema);
module.exports = userregistration;
