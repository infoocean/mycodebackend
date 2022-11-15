const nodemailer = require("nodemailer");
// send mail
const sendmailcontroller = async (req, res) => {
  console.log(req.body);
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maryse.breitenberg@ethereal.email", // generated ethereal user
        pass: "HW3N34eMMPNBEZusax", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "sj2585097@gmail.com", // sender address
      to: "infoocean8454@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  sendmailcontroller,
};
