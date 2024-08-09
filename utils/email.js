// utils/email.js
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email = "kamran_tailor@hotmail.com";
const password = process.env.OUTLOOK;
const discordToken = process.env.DISCORD_TOKEN;

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: email,
    pass: password
  }
});

async function sendEmail(toEmail, subject, content) {
  try {
    // Check if the email address is not empty
    if (!toEmail || !toEmail.trim()) {
      console.error('Invalid email address');
      return;
    }

    // Email is not empty, proceed to send the email
    const mailOptions = {
      from: email, // Sender's email address
      to: toEmail, // Recipient's email address
      subject: subject,
      text: content,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Prepare message data for Discord webhook
    const messageData = {
      content: `<@&1189191922477178951>
      **Automated Email sent** 
      Subject: ${subject}
      To: ${toEmail}`,
    };

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

async function sendEmailHTML(toEmail, subject, html) {
  let mailOptions = {
    from: email,
    to: toEmail,
    subject: subject,
    html: html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export { sendEmail, sendEmailHTML };
