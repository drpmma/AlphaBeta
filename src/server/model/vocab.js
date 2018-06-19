const mongoose = require('mongoose');

const VocabScheme = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    vocabType: {
        type: String,
        required: true,
    }
})

const Vocab = mongoose.model('dic', VocabScheme)
module.exports = Vocab