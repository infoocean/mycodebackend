const nodemailer = require("nodemailer");
const visitorsmodel = require("../../Models/visitormodel/visitormodel");
const QRCode = require("qrcode");

// send mail controller
const sendmailcontroller = async (req, res) => {
  //console.log(req.body);
  const visitordata = req.body;
  //console.log(visitordata);
  try {
    const qrcode = await QRCode.toDataURL(visitordata.qrcode);
    const visitorsdet = await visitorsmodel.findOne({ _id: visitordata.id });
    //console.log(visitorsdet);
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
      subject: " Confirmation Emails From Our Hotel✔",
      text: `Hello, ${visitorsdet.name}`,
      html: `<p><b>Hello ,</b> ${visitorsdet.name} !</p> 
      <p>I hope you're having a great day.</p>
      <p>My guess is that he or she might be looking for a hotel that has all the 
      things they need - from meeting space to fine dining.
       They offer more than just a place to rest and recharge. 
       Get a quote from GM Hotel and contact us with any questions you might have.</p>
       <p>My guess is that he or she might be looking for a hotel that has all the 
      things they need - from meeting space to fine dining.
       They offer more than just a place to rest and recharge. 
       Get a quote from GM Hotel and contact us with any questions you might have.</p>
       <h5>Thanks,</h5>
       <h3>Get More Information Scan QR Code Now</h3>
       <img src =${qrcode}>
      `,
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
