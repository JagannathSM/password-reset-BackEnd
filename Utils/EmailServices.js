const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendPassResetEmail = (options) => {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ACC,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_ACC,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      options.res.status(404).json({message:false});
    }
    if (info.response) {
      options.res.status(201).json({message:true});
    }
  });
};

module.exports = sendPassResetEmail;
