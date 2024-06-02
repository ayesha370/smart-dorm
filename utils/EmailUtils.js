const nodemailer = require('nodemailer');

// Configure the transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'smartdorm24@gmail.com', // Replace with your Gmail address
    pass: 'qkpn milq ldmh rkra', // Replace with your app-generated password
  },
});

/**
 * Sends an email with a confirmation token.
 * @param {string} confirmToken - The confirmation token to include in the email.
 * @param {string} recipientEmail - The recipient's email address.
 */
async function sendConfirmationEmail(confirmToken, recipientEmail) {
  const mailOptions = {
    from: 'smartdorm24@gmail.com', // Sender address
    to: recipientEmail, // Recipient email address
    subject: 'SmartDorm Email Confirmation', // Subject line
    text: `Click on the link below to confirm your email. The link will expire in 3 hours.\n: http://localhost:3000/confirm-email/${confirmToken}\n\n Ignore the email if you haven't signed up at Smart Dorm.\n\n\nThanks` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function sendResetPasswordEmail(resetToken, recipientEmail) {
  const mailOptions = {
    from: 'smartdorm24@gmail.com', // Sender address
    to: recipientEmail, // Recipient email address
    subject: 'SmartDorm Reset Password', // Subject line
    text: `Click on the link below to reset your password. The link will expire in 8 minutes.\nhttp://localhost:3000/reset-password/${resetToken}\n\n\nThanks` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendConfirmationEmail, sendResetPasswordEmail };

