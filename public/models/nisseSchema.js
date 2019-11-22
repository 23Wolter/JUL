var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nisseSchema = new Schema({
    admin: String,
    nisser: {
        type: Array,
        default: []
    },
}, { usePushEach: true });

var nisseClass = mongoose.model('nisser', nisseSchema);

module.exports = nisseClass;