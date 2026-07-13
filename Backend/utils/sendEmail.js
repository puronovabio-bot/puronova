import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';
dotenv.config();

// Force IPv4 resolution to prevent IPv6 ENETUNREACH errors on cloud hosting (Render)
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const sendEmail = async (options) => {
  // Use a fallback text if credentials are not provided to avoid crashing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials not configured. Skipping email sending. Please configure EMAIL_USER and EMAIL_PASS in your .env file.");
    return;
  }

  try {
    let host = 'smtp.gmail.com';
    try {
      const ips = await dns.promises.resolve4('smtp.gmail.com');
      if (ips && ips.length > 0) {
        host = ips[0];
      }
    } catch (dnsErr) {
      console.warn("DNS resolve4 failed:", dnsErr.message);
    }

    const transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      tls: {
        servername: 'smtp.gmail.com'
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
