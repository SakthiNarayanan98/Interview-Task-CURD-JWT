const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: 'sakthinarayanan.rk@gmail.com',
    subject: 'Interview Task',  
    text: ' I have completed the task as assigned.Kindly review it and let me know if you have any feedback. ',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
