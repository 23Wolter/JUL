var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Jul' });
});




// START OF THE GAME
router.post('/start', function(req, res) {

    var name = req.body.name;

    nisseClass.find().where({
        'playerName': name
    }).exec(function(err, player) {
        if (err) {
            res.send(err);
        } else {
            console.log(player);

            res.redirect('nisse');
        }
    });
});


router.get('/nisse', function(req, res, next) {
    res.render('nisse', { title: 'Nissetid' });
});


module.exports = router;