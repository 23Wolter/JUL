var express = require('express');
var router = express.Router();
var fs = require('fs');
var nisseClass = require('./../public/models/nisseSchema.js');
var playerClass = require('./../public/models/playerSchema.js');


var master_admin = "oliver";

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Jul' });
});


// START OF THE GAME
router.post('/start', function(req, res) {

    var name = req.body.name;

    playerClass.findOne({
        playerName: name
    }, {}, function(err, player) {
        if (err) {
            res.send(err);
        } else {

            console.log(player);

            var nisse = "";
            var isNisse = false;

            if (player) {
                console.log("player exists " + player.playerName + " " + player.nisseName);
                nisse = player.nisseName;
                isNisse = true;
            } else {
                console.log("no player found " + isNisse);
                player = new playerClass({
                    playerName: name
                });

                player.save(function(err, data) {
                    if (err) console.log(err);
                });
            }

            console.log("Nisse er " + nisse);

            res.render('nisse', {
                player: name,
                nisse: nisse,
                isNisse: isNisse
            });

        }
    });
});

router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'Admin' });
});


router.post('/admin_post', function(req, res) {

    var name = req.body.name;
    var nisser = req.body.hidden;
    console.log("admin post ", typeof nisser);

    nisser = nisser.split(',');
    console.log(nisser);

    nisseClass.findOne({
        admin: name
    }, function(err, admin) {
        if (err) {
            console.log(err);
        } else {

            if (!admin) {

                admin = new nisseClass({
                    admin: name,
                    nisser: nisser
                });

            } else {
                admin.nisser = nisser;
            }

            admin.save(function(err, data) {
                if (err) console.log(err);
            });

            res.render('index', { title: 'Jul' });
        }
    });
});

router.get('/nisse', function(req, res, next) {
    res.render('nisse', { title: 'Nissetid' });
});

router.get('/getNisse', function(req, res, next) {

    nisseClass.findOne({
        admin: master_admin
    }, {}, function(err, nisse) {
        if (err) {
            res.send(err);
        } else {
            console.log("hej ", nisse);
            res.send(nisse);
        }
    });
});

router.post('/setNisse', function(req, res, next) {

    var name = req.body.name;
    var nisse = req.body.nisse;

    console.log(name);

    playerClass.findOne({
        playerName: name
    }, {}, function(err, player) {
        if (err) {
            res.send(err);
        } else {
            player.nisseName = nisse;
            player.save(function(err, data) {
                if (err) console.log(err);
            });

            res.send("done");
        }
    });
});


module.exports = router;