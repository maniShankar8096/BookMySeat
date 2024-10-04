const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

const replaceContent = (content, creds) => {
  const allKeysArr = Object.keys(creds);
  allKeysArr.forEach((key) => {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
};

const emailHelper = async (templateName, receiverEmail, creds) => {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from: "mrinal.bhattacharya@scaler.com",
      subject: "Mail from BookMySeat",
      text: `Hi ${creds.name} This is your reset OTP ${creds.otp}`,
      html: replaceContent(content, creds),
    };
    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };
    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
  } catch (err) {
    console.log(err);
  }
};

module.exports = emailHelper;
