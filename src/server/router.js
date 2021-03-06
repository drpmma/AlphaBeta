const express = require('express');
const router = express.Router();
const WordRecord = require('./model/wordRecord')
const User = require('./model/user')
const Vocab = require('./model/vocab')
const DicIntro = require('./model/dicIntro')
const Note = require('./model/note')
const mongoose = require('mongoose')
// functions
const learnWord = require('./learnWord')
const shuffle = require('./shuffle')



router.get('/', (req, res) => res.json({ message: 'Jerry! welcome to our api!' }))
router.get('/dicintro', (req, res) => {
	DicIntro.find({}).then(dics => { res.json(dics) })
})
router.get('/word', (req, res) => {
	console.log('query', req.query)
	User.findOne({ username: req.query.user })
		.populate({
			path: 'words',
			populate: {
				path: 'word',
				model: 'dic'
			}
		})
		.exec((err, data) => {
			if (err) return console.log(err)
			else {
				const records = learnWord(data.words, req.query.dic)
				Vocab.findWordArray(records, res)
			}
		})
})


router.get('/reviewword', (req, res) => {
	console.log('query', req.query)
	User.findOne({ username: req.query.user })
		.populate({
			path: 'words',
			populate: {
				path: 'word',
				model: 'dic'
			}
		})
		.exec((err, data) => {
			if (err) return console.log(err)
			else {
				const words = data.words.filter(value => {
					return (value.trueNumber + value.falseNumber) > 0
				}).sort((a, b) => {
					return (b.falseNumber - b.trueNumber) - (a.falseNumber - a.trueNumber)
				})
				if (words.length < 10) {
					res.json({ word: -1 })
				}
				else {
					let index
					if (req.query.index < words.length) {
						index = req.query.index
					}
					else {
						index = words.length - 10
					}
					const records = words.slice(index, index + 10).map(value => {
						[value.word.key, value.word.value] = [value.word.value, value.word.key]
						return value
					})
					// swap value and key for review
					Vocab.findWordArray(records, res, "review")
				}
			}
		})
})

router.get('/exam', (req, res) => {
	console.log('query', req.query)
	User.findOne({ username: req.query.user })
		.populate({
			path: 'words',
			populate: {
				path: 'word',
				model: 'dic'
			}
		}).exec((err, data) => {
			if (err) return console.log(err)
			else {
				const records = shuffle(data.words).slice(0, 10)
				Vocab.findWordArray(records, res)
			}
		})
})

router.post('/wordresult', (req, res) => {
	User.findOne({ username: req.body.user })
		.then(result => {
			const userId = result._id
			const query = { word: req.body.wordID, user: userId }
			const update = req.body.isCorrect ? { $inc: { trueNumber: 1 } } : { $inc: { falseNumber: 1 } }
			WordRecord.findOneAndUpdate(query, update).exec((err, data) => {
				if (err) console.log(err)
				else console.log(data)
			})
			return res.end()
		})

})

router.get('/getnote', (req, res) => {
	const username = req.query.user
	User.findOne({ username: username })
		.then(result => {
			const userId = result._id
			Note.find({ user: userId })
				.populate({
					path: 'word',
				})
				.exec((err, data) => {
					if (err) console.log(err)
					else res.json(data)
				})
		})
})

router.post('/deletenote', (req, res) => {
	console.log(req.body)
	const query = req.body
	Note.findOneAndDelete(query, (err, data) => {
		if (err) console.log(err)
		else res.send(data)
	})
})

router.post('/addnote', (req, res) => {
	const wordIds = req.body.wordIds
	const username = req.body.user
	console.log(req.body)
	User.findOne({ username: username })
		.then(result => {
			const userId = result._id
			const noteData = wordIds.map(value => {
				return {
					_id: new mongoose.Types.ObjectId(),
					word: value,
					user: userId
				}
			})
			Note.insertMany(noteData, (err, docs) => {
				if (err) {
					return console(err);
				} else {
					console.log(docs)
					return res.end()
				}
			})
		})
})

router.post('/inital', (req, res) => {
	const dicType = req.body.dic
	const username = req.body.user
	User.findOne({ username: username })
		.then(result => {
			const userId = result._id
			if (result.words.length == 0) {
				Vocab.addDic(dicType, userId)
			}
			else {
				WordRecord.aggregate([
					{
						$unwind: "$word"
					},
					{
						$lookup: {
							from: "dics",
							localField: "word",
							foreignField: "_id",
							as: "wordObject"
						}
					},
					{
						$group: {
							_id: "$user",
							type: { $addToSet: "$wordObject.type" }
						}
					}
				], (err, data) => {
					if (err) console.log(err)
					else {
						let typeArray = []
						for (const sub of data[0].type) {
							typeArray.push(sub[0])
						}
						if (data[0]._id.toString() === userId.toString() && typeArray.indexOf(dicType) == -1) {
							Vocab.addDic(dicType, userId)
						}
						else {
							console.log("alread added")
							return res.end()
						}
					}
				})
				// return res.end()
			}
		})
})

//POST route for updating data
router.post('/user', function (req, res, next) {
	if (req.body.passwordConf && (req.body.password !== req.body.passwordConf)) {
		const err = new Error('Passwords do not match.');
		err.status = 400;
		res.send("passwords dont match");
		return next(err);
	}

	if (req.body.email &&
		req.body.username &&
		req.body.password &&
		req.body.passwordConf) {

		const userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		}

		User.create(userData, function (error) {
			if (error) {
				return next(error);
			} else {
				// req.session.userId = user._id;
				return res.end()
			}
		});

	} else if (req.body.username && req.body.password) {
		User.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {
				const err = new Error('Wrong username or password.');
				err.status = 401;
				return next(err);
			} else {
				// req.session.userId = user._id;
				return res.end()
			}
		});
	} else {
		const err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
})

module.exports = router;
