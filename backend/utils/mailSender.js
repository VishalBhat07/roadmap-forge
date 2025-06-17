require("dotenv").config();
const nodemailer = require("nodemailer");
const generateEmailHTML = require("./mailTemplates.js");

async function sendEmail(
  userEmail,
  subject,
  text,
  template,
  buttonText = "Get Started",
  buttonLink = "https://roadmap-forge-frontend.vercel.app"
) {
  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

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

    const htmlContent = generateEmailHTML({
      text,
      template,
      day,
      month,
      year,
      buttonText,
      buttonLink,
    });

    const info = await transporter.sendMail({
      from: `"RoadMapForge" <${process.env.ADMIN_EMAIL}>`,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;
