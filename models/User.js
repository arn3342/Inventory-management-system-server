const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('User', user);