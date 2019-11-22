var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    playerName: String,
    nisseName: String
}, { usePushEach: true });

var playerClass = mongoose.model('players', playerSchema);

module.exports = playerClass;