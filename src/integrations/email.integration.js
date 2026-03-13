const nodemailer = require('nodemailer');
const config = require('../config/app.config');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // true untuk 465, false untuk lainnya
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const kirimEmail = async ({ ke, subjek, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.app.nama}" <${config.email.from}>`,
      to: ke,
      subject: subjek,
      html: html,
    });
    console.log('✅ Email Terkirim:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Gagal Kirim Email:', err.message);
    throw err;
  }
};

module.exports = { kirimEmail };
