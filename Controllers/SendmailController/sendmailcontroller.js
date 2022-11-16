const nodemailer = require("nodemailer");

// send mail controller
const sendmailcontroller = async (req, res) => {
  //console.log(req.body);
  try {
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maryse.breitenberg@ethereal.email",
        pass: "HW3N34eMMPNBEZusax",
      },
    });

    // Message object
    let message = {
      from: "sj2585097@gmail.com",
      to: "infoocean8454@gmail.com",
      subject: "Nodemailer is unicode friendly ✔",
      text: "Hello to myself!",
      html: "<p><b>Hello</b> to myself!</p>",
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
      //console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(200).send({ message: "email send successfully" });
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  sendmailcontroller,
};
