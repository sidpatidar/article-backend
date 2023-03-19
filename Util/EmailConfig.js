const nodemailer = require("nodemailer");

const createEmailConnection = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter;
};

module.exports = createEmailConnection;
