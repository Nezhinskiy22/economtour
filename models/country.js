const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryImg: {
        type: String,
        required: true
    },
    countryAlt: {
        type: String,
        required: true
    },
    countryDsc: {
        type: String,
        required: true
    }
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;