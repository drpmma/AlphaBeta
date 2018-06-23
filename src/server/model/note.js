const mongoose = require('mongoose');
const Schema = mongoose.Schema

let NoteSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    word: { type: Schema.Types.ObjectId, ref: 'dic' },
    user: { type: Schema.Types.ObjectId, ref: 'user'}
});

const Note = mongoose.model('note', NoteSchema)
module.exports = Note