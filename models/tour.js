const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;