const mongoose = require('mongoose');
const WordRecord = require('./wordRecord')
const User = require('./user')

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

VocabScheme.statics.addDic = (dicType, userId) => {
    Vocab.find({ type: dicType }).then(result => {
        const RecordID = WordRecord.initRecord(result, userId)
        User.update({ _id: userId }, {
            $push: {
                words: { $each: RecordID },
            }
        },
            err => {
                if (err)
                    console.log(err)
                else
                    console.log("Success")
            })
    })
}

const Vocab = mongoose.model('dic', VocabScheme)
module.exports = Vocab