import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';
dotenv.config();

const sendEmail = async (options) => {
  // Use a fallback text if credentials are not provided to avoid crashing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not configured. Skipping email sending. Please configure EMAIL_USER and EMAIL_PASS in your .env file.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Puro Nova <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.email}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendEmail;
