var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "stackathonart@gmail.com",
        pass: "stackathon1" //password has been changed
    }
});

exports.send = function(req, res) {
    console.log("req", req.body);
    var mailOptions = {
        to: req.body.email,
        subject: req.body.subject,
        from: "stackathon@gmail.com",
        text: 'https://arcane-wildwood-22478.herokuapp.com/' + req.body.id
  };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
};
