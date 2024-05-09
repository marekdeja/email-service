const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  let { email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_MAIN,
    subject: subject,
    text: `From: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json("Email sent successfully");
  } catch (error) {
    res.status(500).json("Error sending email");
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
