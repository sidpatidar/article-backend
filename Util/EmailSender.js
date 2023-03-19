const createEmailConnection = require("./EmailConfig");
const { createWelcomeEmailTempalte } = require("./EmailTemplate");

const transporter = createEmailConnection();
const welcomeEmailSender = (password, username, roleIs) => {
  const mailOptions = createWelcomeEmailTempalte(password, username, roleIs);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { welcomeEmailSender };
