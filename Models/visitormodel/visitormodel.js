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
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  purposetovisit: {
    type: String,
  },
  checkindatetime: {
    type: Date,
  },
  checkoutdatetime: {
    type: Date,
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
