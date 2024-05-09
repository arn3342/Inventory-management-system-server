const mongoose = require('mongoose');

const categories = new mongoose.Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('Categories', categories);