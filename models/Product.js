const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    categoryId: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model('Product', product);