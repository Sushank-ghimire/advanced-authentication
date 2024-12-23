import { configDotenv } from "dotenv";
import { MailtrapClient } from "mailtrap";

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
        category: "Integration Test",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.log("Error while sending welcome email: ", error.message);
  }
};

// Function to send an email verification
const sendVerifyEmail = (receiverEmail, verificationCode) => {
  try {
    client
      .send({
        from: sender,
        to: [{ email: receiverEmail }],
        subject: "Verify Your Email Address",
        html: ``,
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
const sendForgotPasswordEmail = (receiverEmail, resetVerificationCode) => {
  try {
    client
      .send({
        from: sender,
        to: [{ email: receiverEmail }],
        subject: "Reset Your Password",
        html: ``,
        category: "Forgot Password",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.log("Error while sending reset password email: ", error.message);
  }
};

export { sendWelcomeEmail, sendVerifyEmail, sendForgotPasswordEmail };
