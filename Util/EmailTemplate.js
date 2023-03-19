const createWelcomeEmailTempalte = (password, username, roleIs) => {
  const role = roleIs == "EMP" ? "Employee" : "Manager";
  const emailTemplate = {
    from: process.env.EMAIL_USERNAME,
    to: username,
    subject: "Welcome to GoMax Tool",
    text: `"Welcome to GoMaxoo Team"\n
        You are registered as ${role}\n.
        Your Username and password mentioned below.\n
        Username: ${username}\n
        Password: ${password}\n
        Thanks and Regards !

        `,
  };
  return emailTemplate;
};
module.exports = { createWelcomeEmailTempalte };
