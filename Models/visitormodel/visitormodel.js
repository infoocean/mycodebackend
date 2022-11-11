const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const VisitorsSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
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
  dateofbirth: {
    type: Date,
  },
  age: {
    type: Number,
  },
  addressofarea: {
    type: String,
  },
  tokens: [],
});

//generate login auth token
// UserRegistrationSchema.methods.generateAuthToken = async function (param) {
//   try {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
//     this.token = token;
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const visitorsmodel = new mongoose.model("Visitors", VisitorsSchema);
module.exports = visitorsmodel;
