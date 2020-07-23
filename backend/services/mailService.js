const sgMail = require('@sendgrid/mail');
const config = require('config');


function sendMail(to, from, subject, text, html) {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html,
    };
    sgMail.send(msg, false, (error, results) => {
        if (error) {
            console.log(error)
        }
    });
};
module.exports = {
    sendMail
};