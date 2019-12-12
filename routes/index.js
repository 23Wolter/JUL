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
    var onsker = req.body.onsker;
    console.log("this ønsker " + onsker);

    nisseClass.findOne({
        admin: master_admin
    }, function(err, nisse) {
        if (err) {
            res.send(err);
        } else {
            console.log("hej ", nisse);

            var people = nisse.people;
            var nisser = nisse.nisser;
            console.log("current ønsker " + typeof nisse.nisseOnsker);
            var current_onsker = nisse.nisseOnsker;
            console.log("one ønske " + current_onsker[0]);
            var wishes = "";
            var secretNisse = "";
            var nextWishes = "";
            for (var i = 0; i < people.length; i++) {
                if (people[i].toLowerCase().trim() == name.toLowerCase().trim()) {
                    secretNisse = nisser[i];
                    current_onsker[i] += (" " + onsker);
                    wishes = current_onsker[i];
                    nisse.nisseOnsker[i] = wishes;

                    nextWishes = nisse.nisseOnsker[i + 1];
                    break;
                } else {
                    secretNisse = null;
                }
            }

            nisse.markModified('nisseOnsker');
            nisse.save(function(err, data) {
                if (err) console.log(err);
            });

            res.render('nisse', {
                player: name,
                nisse: secretNisse,
                onsker: nextWishes
            });
        }
    });
});

router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'Admin' });
});


router.post('/admin_post', function(req, res) {

    var name = req.body.name;
    var people = req.body.hidden;
    console.log("admin post ", typeof people);

    people = people.split(',');
    console.log(people);

    var j, x, i;
    for (i = people.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = people[i];
        people[i] = people[j];
        people[j] = x;
    }

    var nisser = people.slice();
    var a = nisser.shift();
    nisser.push(a);
    console.log("nisser " + nisser);

    nisseClass.findOne({
        admin: name
    }, function(err, admin) {
        if (err) {
            console.log(err);
        } else {

            if (!admin) {

                admin = new nisseClass({
                    admin: name,
                    people: people,
                    nisser: nisser
                });

            } else {
                admin.people = people;
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