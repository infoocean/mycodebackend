const nodemailer = require("nodemailer");
// send mail
const sendmailcontroller = async (req, res) => {
  console.log(req.body);

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sj2585097@gmail.com",
      pass: "Shubham#12",
    },
  });

  let mailDetails = {
    from: "sj258097@gmail.com",
    to: "infoocean8454@gmail.com",
    subject: "Test mail",
    text: "Node.js testing mail for GeeksforGeeks",
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = {
  sendmailcontroller,
};
