const mongoose = require('mongoose');

const VocabScheme = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    }
})

const Vocab = mongoose.model('dic', VocabScheme)
module.exports = Vocab