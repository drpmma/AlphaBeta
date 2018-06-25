const mongoose = require('mongoose');
const WordRecord = require('./wordRecord')
const User = require('./user')
const shuffle = require('../shuffle')

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

VocabScheme.statics.findWordArray = (records, res, mode="") => {
    const ids = records.map(value => value.word._id)
    Vocab.count().exec((err, count) => {
        let random = Math.floor(Math.random() * count)
        if (random + 30 > count) {
            random = random - 30
        }
        Vocab.find({ _id: { $nin: ids } }).skip(random).limit(30).exec((err, data) => {
            let falseValue = []
            for (const item of data) {
                const value = mode === "review" ? item.key : item.value
                falseValue.push({ value: value, id: item._id })
            }
            falseValue = shuffle(falseValue)
            res.json({ records, falseValue })
        })
    })
}

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