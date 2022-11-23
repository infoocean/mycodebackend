const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const bcrypt = require("bcryptjs");
//require model
const Receptionistmodel = require("../../Models/ReceptionistModel/receptionistmodel");
const visitorsmodel = require("../../Models/visitormodel/visitormodel");

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

//send reset password email controller
const sendresetpassemailcontroller = async (req, res) => {
  //console.log(req.body);
  //console.log(req.body.link);
  try {
    const checkemail = await Receptionistmodel.findOne({
      email: req.body.email,
    });
    //console.log(checkemail);
    const myid = checkemail._id.toString();
    //console.log(myid);
    //return false;
    if (checkemail !== null) {
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
        subject: "Reset Password Link From Our Hotel✔",
        text: `Hello, User`,
        html: `<body
              marginheight="0"
              topmargin="0"
              marginwidth="0"
              style="margin: 0px; background-color: #f2f3f8;"
              leftmargin="0"
            >
            <table
              cellspacing="0"
              border="0"
              cellpadding="0"
              width="100%"
              bgcolor="#f2f3f8"
            >
          <tr>
            <td>
              <table
                style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;"
                width="100%"
                border="0"
                align="center"
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr />
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                  >
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding:0 35px;">
                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                          You have requested to reset your password
                        </h1>
                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                          We cannot simply send you your old password. A unique link
                          to reset your password has been generated for you. To reset
                          your password, click the following link and follow the
                          instructions.
                        </p>
                        <a
                          href=${req.body.link}/${myid}
                          style="background:#057035;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;"
                        >
                          Reset Password
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
                <tr>
                  <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                      &copy; <strong>www.ourhotel.com</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="height:80px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
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
    } else {
      res.status(400).send({ message: "email not registred" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const setnewpassword = async (req, res) => {
  //console.log(req.body);
  const _id = req.params.id;
  const { password, confirmpassword } = req.body;
  //bycript password
  const secure_password = await bcrypt.hash(password, 12);
  const secure_confirmpassword = await bcrypt.hash(confirmpassword, 12);
  const setnewpass = {
    password: secure_password,
    confirmpassword: secure_confirmpassword,
  };
  //console.log(setnewpass);
  //return false;
  try {
    const queryupdatedata = await Receptionistmodel.findByIdAndUpdate(
      _id,
      setnewpass
    );
    //console.log(queryupdatedata);
    //return false;
    if (res !== null) {
      res.status(202).send({
        message: "password updated successfully",
      });
    } else {
      res.status(400).send({
        message: "errors server invalid crendiential",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  sendmailcontroller,
  sendresetpassemailcontroller,
  setnewpassword,
};
