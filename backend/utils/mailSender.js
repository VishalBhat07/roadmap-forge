require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(userEmail, subject, text) {
  console.log(userEmail);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"RoadMapForge" <${process.env.ADMIN_EMAIL}>`,
      to: userEmail,
      subject: subject,
      text: text,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;
