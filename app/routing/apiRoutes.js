var friends = require('../data/friends.js');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app) {
    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post('/api/friends', function(req, res){

        var match = {
            'name': 'none',
            'photo': 'none'
        };

        var userTotal = sum(req.body.scores);

        var friendTotal = 0;

        var closest = 50;

        for (var i = 0; i < friends.length; i++) {
            friendTotal = sum(friends[i].scores);
            var diff = Math.abs(friendTotal - userTotal);
            if (diff <= closest) {
                close = diff;
                match.name = friends[i].name;
                match.photo = friends[i].photo;
            };
        };

        function sum(array) {
            var total = 0;
            for (var x = 0; x < array.length; x++) {
                total += parseInt(array[x]);
            }
            return total;
        }

        res.json(match);
    });
};