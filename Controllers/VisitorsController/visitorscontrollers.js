const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");

//require models
const visitorsmodel = require("../../Models/visitormodel/visitormodel");

// visitor registration controller
const visitorregistrationcontroller = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.number) {
    return res.status(400).send({ message: "all feild is required" });
  }
  const visitordata = new visitorsmodel(req.body);
  try {
    const check_email = await visitorsmodel.findOne({
      email: req.body.email,
    });
    if (check_email !== null) {
      return res.status(200).send({ message: "email allready registred " });
    }
    const savedata = await visitordata.save();
    res.status(201).send({ message: "data save successfully", data: savedata });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//get all visitors controllers
const getvisitscontroller = async (req, res) => {
  try {
    const visitors = await visitorsmodel.find().sort({ datetime: -1 });
    //console.log(visitors.length);
    //return false;
    if (visitors.length > 0) {
      res.status(200).send({ message: "ok", data: visitors });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//get visitordet by id controller
const getvisitsbyidcontroller = async (req, res) => {
  try {
    const visitorsdet = await visitorsmodel.find({ _id: req.params.id });
    //console.log(visitorsdet);
    if (visitorsdet.length > 0) {
      res.status(200).send({ message: "ok", data: visitorsdet });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// visitor update controller
const visitorupdatecontroller = async (req, res) => {
  const _id = req.params.id;
  const updatedta = req.body;
  try {
    const queryupdatedata = await visitorsmodel.findByIdAndUpdate(
      _id,
      updatedta,
      { new: true }
    );
    //console.log(queryupdatedata);
    if (queryupdatedata !== null) {
      res.status(202).send({ message: "data updated successfully" });
    } else {
      res.status(404).send({ message: "invalid unique id" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete visitor controller
const visitordeletecontroller = async (req, res) => {
  const id = req.params.id;
  try {
    const deletevisitor = await visitorsmodel.deleteOne({
      _id: id,
    });
    //console.log(deletevisitor);
    if (deletevisitor.deletedCount !== 0) {
      res.status(200).send({ message: `visitor deleted successfully` });
    } else {
      res.status(404).send({ message: `invalid unique id` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//visitor searching api
const visitorsearchingcontroller = async (req, res) => {
  //console.log(req.query);
  //console.log(req.query["name"]);
  let query = [];
  if (req.query["name"]) {
    query.push({ name: req.query["name"] });
  }
  if (req.query["email"]) {
    query.push({ email: req.query["email"] });
  }
  if (req.query["status"]) {
    query.push({ status: req.query["status"] });
  }
  //console.log(query);
  try {
    const data = await visitorsmodel.find({
      $and: query,
    });
    console.log(data);
    if (data.length > 0) {
      res.status(200).send({ message: "ok", data });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//get recent checking visitor controller
const getrecentcheckingvisitors = async (req, res) => {
  try {
    const recent_visitor = await visitorsmodel
      .find({ status: 1 })
      .sort({ checkindatetime: -1 })
      .limit(10);
    console.log(recent_visitor);
    if (recent_visitor.length > 0) {
      res.status(200).send({ message: "ok", recent_visitor });
    } else {
      res.status(400).send({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//generate qr code
const generateqrcodevisitorcontroller = async (req, res) => {
  //console.log(req.params.id);
  try {
    myvisitordata = await visitorsmodel.findOne({ _id: req.params.id });
    if (myvisitordata) {
      const myqrdata = await QRCode.toDataURL(myvisitordata.name);
      res.status(200).send({ data: myqrdata });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  visitorregistrationcontroller,
  getvisitscontroller,
  getvisitsbyidcontroller,
  visitorupdatecontroller,
  generateqrcodevisitorcontroller,
  visitorsearchingcontroller,
  getrecentcheckingvisitors,
  visitordeletecontroller,
};
