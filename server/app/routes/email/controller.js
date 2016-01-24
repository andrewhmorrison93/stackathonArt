var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "stackathon@gmail.com",
        pass: "" //password has been changed
    }
});

exports.send = function(req, res) {
    console.log("req", req.body);
    var mailOptions = {
        to: req.body.userID.email,
        subject: 'You have received a request to react to a #selfie',
        from: "stackathon@gmail.com",
        text: 'Please click on the following link to react: http:// ' + req.params.id
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
};
