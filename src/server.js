require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { RecaptchaV3 } = require("express-recaptcha");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// reCAPTCHA setup
const recaptcha = new RecaptchaV3(
  process.env.RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY,
);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "smtp.mailtrap.io",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to handle form submission
app.post("/submit-form", recaptcha.middleware.verify, (req, res) => {
  if (!req.recaptcha.error) {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // Use the recipient email from the environment variable
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending email");
      }
      res.status(200).send("Email sent successfully");
    });
  } else {
    res.status(400).send("reCAPTCHA verification failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
