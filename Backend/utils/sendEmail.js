import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (options) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Skipping email sending. Please configure RESEND_API_KEY in your .env file.");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // You can set EMAIL_FROM in your .env file once you add a custom domain to Resend.
    // Otherwise, Resend allows sending from onboarding@resend.dev for testing.
    const fromEmail = process.env.EMAIL_FROM || 'Puro Nova <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error("Resend API error:", error);
    } else {
      console.log(`Email sent successfully to ${options.email}. ID: ${data?.id}`);
    }
  } catch (error) {
    console.error(`Error sending email to ${options.email}:`, error);
  }
};

export default sendEmail;
