require('dotenv').config(); 
const nodemailer = require('nodemailer');


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log("Email User:", EMAIL_USER);
console.log("Email Pass:", EMAIL_PASS);


if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS environment variables are missing");
}

const sendMail = async (email, subject, text) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });


    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        await transport.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = sendMail;
