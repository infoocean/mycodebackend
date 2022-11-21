const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const VisitorsSchema = new Schema({
  name: {
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
  dob: {
    type: Date,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  postalcode: {
    type: Number,
  },
  datetime: {
    type: Date,
    default: Date.now(),
  },
  govtidname: {
    type: String,
    default: "",
  },
  govtidnumber: {
    type: Number,
    default: "",
  },
  purposetovisit: {
    type: String,
    default: "",
  },
  assets: {
    type: String,
    default: "",
  },
  checkindatetime: {
    type: Date,
    default: "1970-01-01T00:00:00.001Z",
  },
  checkoutdatetime: {
    type: Date,
    default: "1970-01-01T00:00:00.001Z",
  },
  status: {
    type: Number,
    default: 0,
  },
  tokens: [
    {
      token: { type: String },
    },
  ],
});

//generate login auth token
// VisitorsSchema.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const visitorsmodel = new mongoose.model("Visitors", VisitorsSchema);
module.exports = visitorsmodel;
