import { configDotenv } from "dotenv";
import { MailtrapClient } from "mailtrap";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./EmailTemplates.js";

// Load environment variables
configDotenv({
  path: "../../.env",
});

const token = process.env.MAILTRAP_API_TOKEN;

// Initialize Mailtrap client
const client = new MailtrapClient({
  token: token,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Advanced Authentication",
};

// Function to send a welcome email
const sendWelcomeEmail = (receiverEmail) => {
  try {
    client
      .send({
        from: sender,
        to: [{ email: receiverEmail }],
        subject: "Welcome to the advanced authentication system",
        html: "<p>Congrats for sending a test email with Mailtrap!</p>",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.log("Error while sending welcome email: ", error.message);
  }
};

// Function to send an email verification
const sendVerifyEmail = (receiverEmail, token) => {
  try {
    client
      .send({
        from: sender,
        to: [{ email: receiverEmail }],
        subject: "Verify Your Email Address",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", token),
        category: "Email Verification",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.log(
      "Error while sending email verification email: ",
      error.message
    );
  }
};

// Function to send a forgot password email
const sendForgotPasswordEmail = (receiverEmail, resetUrl) => {
  try {
    client
      .send({
        from: sender,
        to: [{ email: receiverEmail }],
        subject: "Reset Your Password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
        category: "Forgot Password",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.log("Error while sending reset password email: ", error.message);
  }
};

const passwordResetSuccessEmail = async (receiverEmail) => {
  try {
    client.send({
      from: sender,
      to: [{ email: receiverEmail }],
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Success Email",
    });
  } catch (error) {
    console.log(
      "Error while sending password reset success email: ",
      error.message
    );
  }
};

export {
  sendWelcomeEmail,
  sendVerifyEmail,
  sendForgotPasswordEmail,
  passwordResetSuccessEmail,
};
