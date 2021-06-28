const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const smtpModule = (to, subject, html) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: process.env.SMTP_EMAIL_ADDRESS,
    to,
    subject,
    html,
  };
  const promise = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(false);
      } else {
        console.log(info);
        resolve(true);
      }
    });
  });
  return promise;
};

module.exports = smtpModule;
