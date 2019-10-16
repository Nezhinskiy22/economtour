const mongoose = require('mongoose'),
    Country = mongoose.model('Country');

module.exports = {
    all: function (req, res) {
        Country.find({})
            .then(countries => res.status(200).json(countries))
            .catch(err => res.status(500).json(err));
    },
    createCountry: function (req, res) {
        var new_Country = new Country(req.body);
        new_Country.saveAsync()
            .then(country => res.status(200).json(country))
            .catch(err => res.status(500).json(err))
    },
    read: function (req, res) {
        Country.findById(req.params.countryId)
            .then(country => res.status(200).json(country))
            .catch(err => res.status(500).json(err));
    },
    update: function (req, res) {
        Country.findByIdAndUpdate(req.params.countryId,
            req.body, {
                new: true
            })
            .then(country => res.status(200).json(country))
            .catch(err => res.status(500).json(err));
    },
    delete: function (req, res) {
        Country.remove({
            _id: req.params.countryId
        })
            .then(country => res.status(200).json({
                message: "Ok"
            }))
            .catch(err => res.status(500).json(err))
    }
};