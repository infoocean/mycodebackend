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
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

const userregistration = new mongoose.model("Users", UserRegistrationSchema);
module.exports = userregistration;
