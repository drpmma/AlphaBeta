const mongoose = require('mongoose');

const DicIntroScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
})

const DicIntro = mongoose.model('dicIntro', DicIntroScheme)
module.exports = DicIntro