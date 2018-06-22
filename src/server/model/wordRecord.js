const mongoose = require('mongoose');
const Schema = mongoose.Schema

let WordRecordSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    trueNumber: {type: Number, required: true,},
    falseNumber: {type: Number, required: true,},
    word: { type: Schema.Types.ObjectId, ref: 'dic' },
    user: { type: Schema.Types.ObjectId, ref: 'user'}
});

WordRecordSchema.statics.initRecord = (words, userId) => {
    let RecordData = []
    let RecordID = []
    for (const word of words) {
        const id = new mongoose.Types.ObjectId()
        RecordData.push({
            _id: id,
            trueNumber: 0,
            falseNumber: 0,
            word: word._id,
            user: userId
        })
        RecordID.push({
            _id: id,
        })
    }
    WordRecord.insertMany(RecordData)
    return RecordID
}

const WordRecord = mongoose.model('wordrecord', WordRecordSchema);
module.exports = WordRecord;