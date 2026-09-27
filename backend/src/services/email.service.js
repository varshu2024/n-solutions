import nodemailer from 'nodemailer';

import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: env.gmailUser,
    pass: env.gmailAppPassword
  }
});

export const sendOtpEmail = async ({ to, otp }) => {
  const start = Date.now();

  console.log('📧 Starting OTP email:', to);


await transporter.sendMail({
    from: `"N Solutions Admin" <${env.gmailUser}>`,
    to,
    subject: 'N Solutions Admin Login OTP',
    text: `Your N Solutions Admin login OTP is ${otp}. It is valid for 5 minutes. Do not share this OTP with anyone.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
        <h2>N Solutions Admin Portal</h2>
        <p>Your login verification code is:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          padding: 20px;
          text-align: center;
          background: #f3f6fa;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>Do not share this code with anyone.</p>

        <p>— N Solutions</p>
      </div>
    `
  });


  console.log(`✅ OTP email sent in ${Date.now() - start}ms`);
};