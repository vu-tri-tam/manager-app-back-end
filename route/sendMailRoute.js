var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer

router.post('/', function (req, res, next) {
    const { content, email, subject } = req.body
    var transporter = nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: 'ngoncoiuem123@gmail.com',
            pass: 'Baochau9a3'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'vutritamiuem@gmail.com',
        to: email,
        subject: subject,
        text: 'You recieved message from ' + req.body.email,
        html: `<p>You have got a new message ${subject} </b><ul><li>` + content + `</li></ul>`
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