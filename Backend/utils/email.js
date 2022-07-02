const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `"MOVIEAPP " <cskh@movieapp.vn>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
    // html:
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
