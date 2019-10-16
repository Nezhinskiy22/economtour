const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const countrysController = require('../controllers/countryController');

router.post('/contact', function(req, res) {    
    const auth = {
        auth: {
            api_key: 'key-2900831189847936e9b17fe3e0fc59f8',
            domain: 'mg.andruhovski.com'
        },
        host: 'api.eu.mailgun.net'
    };
    const nodemailerMailgun = nodemailer.createTransport(mg(auth));
    nodemailerMailgun.sendMail({
        from: 'test@mg.andruhovski.com',
        //an array if you have multiple recipients.
        to: 'andruhovski@kpnu.km.ua',
        subject: 'Hey you, awesome!',
        //you can use "html:" to send HTML email content. It's magic!
        html: 'На сайті ЕКОТУР користувач <strong>' + req.body.email +
            '</strong> Залишив повідомлення такого змісту: <strong>' +
            req.body.message + '</strong>',
        //you can use "text:" to send plain-text content. It's oldschool!
        text: 'На сайті ЕКОТУР користувач ' + req.body.email +
            ' Залишив повідомлення такого змісту:' + req.body.message
    }, (err, info) => {
        if (err) {
            console.log('Got an error: ', err);
            res.status(500).json(err);
        } else {
            console.log(`Response: ${info}`);            
            res.status(200).json(info);
        }
    });

});

// countries Routes
router.route('/countries')
    .get(countrysController.all)
    .post(countrysController.createCountry);

router.route('/country/:countryId')
    .get(countrysController.read)
    .put(countrysController.update)
    .delete(countrysController.delete);

module.exports = router;