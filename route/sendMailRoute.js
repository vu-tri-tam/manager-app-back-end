var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer

router.post('/', function (req, res, next) {
    const { content, email, subject } = req.body
    var transporter = nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        host: process.env.DB_HOST_MAILER,
        port: process.env.DB_PORT_MAILER,
        secure: true,
        auth: {
            user: process.env.DB_MAIL_NAME,
            pass: process.env.DB_MAIL_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'manager-app',
        to: email,
        subject: subject,
        text: 'You recieved message from ' + req.body.email,
        html: `<p>You have got a new message ${subject} </b><ul><li>code:` + content + `</li></ul>`
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);

        } else {
            console.log('Đã gửi thành công ' + info.response);
            res.json({
                success: true,
                message: "sent mail successfully",

            })
        }
    });
});

module.exports = router;

// Kết quả email nhận được