const mongoose = require('mongoose');
const Vocab = require('./model/vocab')
// const fs = require('fs')
const vocabCET4 = require('./asset/CET-4.json')
const vocabCET6 = require('./asset/CET-6.json')
const vocabTOEFL = require('./asset/TOEFL.json')

function readVocabToDB(vocab, model, type) {
    let vocabData = []
    for (const key in vocab) {
        vocabData.push({
            word: key,
            meaning: vocab[key],
            vocabType: type
        })
    }
    model.insertMany(vocabData)
    console.log(type, "complete")
}

mongoose.connect('mongodb://localhost/alphabeta').then(
    () => { readVocabToDB(vocabCET4, Vocab, 'CET-4')
    readVocabToDB(vocabCET6, Vocab, 'CET-6')
    readVocabToDB(vocabTOEFL, Vocab, 'TOEFL') },
    err => { console.log(err) }
  );



