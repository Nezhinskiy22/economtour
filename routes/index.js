/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const Country = require('../models/country');
const Tour = require('../models/tour');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const debug = require('debug');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Головна' });
});

router.get('/countries', function(req, res) {
    Country.find({}, function(err, countries) {
        if (err) {
            debug(err);
            return;
        }
        res.render('countries', { title: 'Країни', countries });
    });

});

router.get('/country/:name', function(req, res) {
    Country.findOne({ countryImg: req.params.name }, function(err, country) {
        res.render('country', { title: 'Країна', country });
    });
});

router.get('/tours', function(req, res) {
    Tour.find(function(err, tours) {
        if (!err)
            res.render('tours', { title: 'Тури', tours: tours });
        else
            debug('Error!');
    });

});


router.get('/contact', function(req, res) {
    res.render('contact', { layout: 'layout', title: 'Контакти' });
});

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
        to: "andruhovski@kpnu.km.ua",
        subject: 'Hey you, awesome!',
        //you can use "html:" to send HTML email content. It's magic!
        html: '<b>Wow Big powerful letters!</b>',
        //you can use "text:" to send plain-text content. It's oldschool!
        text: 'На сайті ЕКОТУР користувач ' + req.body.email1 + ' Залишив повідомлення такого змісту:' + req.body.message
    }, (err, info) => {
        if (err) {
            console.log('Got an error: ', err);
            res.render('error', { error: err });
        } else {
            console.log(`Response: ${info}`);
            res.render('contact-success', { title: 'Контакти', email: req.body.email });
        }
    });
});

router.get('/setup', function(req, res) {
    Country.remove({}, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        new Country({
            countryImg: 'at',
            countryAlt: 'Австрия',
            countryDsc: 'Австрия — лакомый кусочек для любителей насыщенного отдыха. Это одна из самых интересных и красивых стран Центральной Европы. Не зря ее называют страной альпийских вершин, лугов, горных озер и прохладных лесов — здесь просто невозможно отвести взгляд от красот, которые дохновляют и окрыляют! Австрия — страна контрастов, и как бы вы не любили отдыхать — вы все равно найдете здесь для себя что-то интересное.'
        }).save();
        new Country({
            countryImg: 'eg',
            countryAlt: 'Египет',
            countryDsc: 'Египет — одно из самых популярных направлений среди украинцев. Уже который год наши соотечественники колесят по этой дивной стране и отдыхают на берегу Красного моря — кажется, что о Египте уже известно все. Но нет! Туроператор Join UP! откроет для вас Египет заново! Вы увидите его таким, каким никогда не видели прежде! Смените пассивный отдых на пляже на череду незабываемых впечатлений от нового Египта! Join UP! против шаблонов, зато за качественный, интересный и неповторимый отдых. Поэтому в Египте туроператор нашел самые удивительные места для развлечений и предлагает открыть новые грани такой знакомой, но все же неизведанной страны.'
        }).save();
        new Country({
            countryImg: 'us',
            countryAlt: 'США',
            countryDsc: 'США — это страна большого природного и культурного наследия, грандиозных возможностей и высочайшего уровня развития. Простираясь от Атлантического океана до Тихого, она предлагает великое множество вариантов путешествия от осмотра разнообразных исторических и культурных достопримечательностей до спокойного и комфортного отдыха на роскошных пляжах Флориды или Гавайских островов.'
        }).save();
        new Country({
            countryImg: 'de',
            countryAlt: 'Германия',
            countryDsc: 'Побывав в Германии, вы точно перестанете опаздывать и будете всегда помнить, где вы положили вещи: ключи, телефон, пульт, тапочки – больше не потеряются. Ведь Германия просто заряжает педантизмом и аккуратностью, упорядоченный стиль жизни и работы здесь в порядке вещей. И в этом ее прелесть! Хотя, не вся Германия такая. Вспомните настоящих немецких болельщиков! Их просто не оттащить от прямо таки гипнотического созерцания матчей любимых команд, после которых следует бурное и безудержное празднование!'
        }).save();
        new Country({
            countryImg: 'gr',
            countryAlt: 'Греция',
            countryDsc: 'Греция – страна, которая будет удивлять снов а и снова, как бы хорошо вы ее не знали. Вне зависимости от того впервые вы в Греции или посещаете ее уже далеко не первый раз – она все равно сможет открыть новые грани и секреты. Она – как изысканная женщина, которая прекрасна и неповторима в любом возрасте.'
        }).save();
        new Country({
            countryImg: 'pl',
            countryAlt: 'Польша',
            countryDsc: 'Adipisicing voluptate consequat sint commodo officia.'
        }).save();
    });
    res.render('index', { title: 'Головна' });
});

router.get('/setup2', function(req, res) {
    new Tour({
        country: 'Польша',
        date: new Date(2014, 0, 1),
        price: 3000
    }).save();
    new Tour({
        country: 'Германия',
        date: new Date(2018, 1, 1),
        price: 3000
    }).save();
    new Tour({
        country: 'Египет',
        date: new Date(2018, 2, 1),
        price: 3000
    }).save();
    new Tour({
        country: 'Швеция',
        date: new Date(2018, 3, 1),
        price: 3000
    }).save();
    res.render('index', { title: 'Головна' });
});
module.exports = router;