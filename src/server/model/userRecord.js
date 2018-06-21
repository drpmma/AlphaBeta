// const mongoose = require('mongoose');
// const WordRecord = require('./wordRecord')
// const Schema = mongoose.Schema

// const UserRecordSchema = new mongoose.Schema({
//     _id: Schema.Types.ObjectId,
//     user: { type: Schema.Types.ObjectId, ref: "User" },
//     words: [WordRecord.schema]
// });

// UserRecordSchema.statics.init = (username, dic, callback) => {
//     UserRecord.findOne({ username: username })
//         .exec((err, user) => {
//             if (err) {
//                 return callback(err)
//             } 
//             else if (!user) {
                
//                 UserRecord.create()
//                 return callback();
//             }
//             else {

//             }
//         }
// }

// const UserRecord = mongoose.model('UserRecord', UserRecord);
// module.exports = UserRecord;