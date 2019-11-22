var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var nisseSchema = new Schema({
    playerName: String,
    nisseName: String
}, { usePushEach: true });

var studentClass = mongoose.model('students', studentSchema);
// var moduleClass = mongoose.model('teachers', moduleSchema); 

module.exports = studentClass;