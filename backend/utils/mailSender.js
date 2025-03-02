require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(
  userEmail,
  subject,
  text,
  buttonText = "Get Started",
  buttonLink = "https://roadmapforge.com"
) {
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

    const htmlContent = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #111827; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">🚀 RoadMapForge</h1>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">${text}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${buttonLink}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              ${buttonText}
            </a>
          </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          <p>Need help? <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #007bff;">Contact Us</a></p>
        </div>
      </div>
    `;

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
