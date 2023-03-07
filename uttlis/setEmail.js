const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(mailOptions) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASS, 
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: mailOptions.from, // sender address
        to: mailOptions.to, // list of receivers
        subject: mailOptions.subject, // Subject line
        text: mailOptions.text, // plain text body
        html: mailOptions.html, // html body
    });

    console.log("Email sent sucessfully")
}

module.exports = sendEmail