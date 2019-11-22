var nodemailer = require('nodemailer');

module.exports = {
    sendMail: function(mail_data) {
        //console.log(results);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'no.reply.own@gmail.com', //vucfyn.diktat.test@gmail.com 
                pass: 'Nielsen777' //Gmailvucfyntest2018
            }
        });

        var mailOptions = {
            from: 'no.reply.own@gmail.com', //vucfyn.diktat.test@gmail.com
            to: mail_data.email,
            subject: 'NO-REPLY',
            // text: message
            html: mail_data.html,
            attachments: [mail_data.image]
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Mail ERROR");
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}