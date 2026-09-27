
import dns from 'node:dns/promises';
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
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



const testGmailDns = async () => {
  try {
    const result = await dns.lookup('smtp.gmail.com', {
      all: true
    });

    console.log('📡 Gmail DNS:', result);
  } catch (error) {
    console.error('❌ Gmail DNS error:', error);
  }
};

testGmailDns();

transporter.verify()
  .then(() => {
    console.log('✅ Gmail SMTP connection works');
  })
  .catch((error) => {
    console.error('❌ Gmail SMTP connection failed:', error);
  });