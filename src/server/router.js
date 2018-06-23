const express = require('express');
const router = express.Router();
const WordRecord = require('./model/wordRecord')
const User = require('./model/user')
const Vocab = require('./model/vocab')
const DicIntro = require('./model/dicIntro')
const Note = require('./model/note')
const learnWord = require('./learnWord')
const mongoose = require('mongoose')


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
				let word = learnWord(data.words, req.query.dic)
				Vocab.count().exec((err, count) => {
					let random = Math.floor(Math.random() * count)
					if (random + 3 > count) {
						random = random - 3
					}
					Vocab.find({ _id: { $ne: word._id } }).skip(random).limit(3).exec((err, data) => {
						let falseValue = []
						for (const item of data) {
							falseValue.push({ value: item.value, id: item._id })
						}
						res.json({ word, falseValue })
					})
				})
			}
		})
})

router.post('/wordresult', (req, res) => {
	const query = { word: req.body.wordID }
	const update = req.body.isCorrect ? { $inc: { trueNumber: 1 } } : { $inc: { falseNumber: 1 } }
	WordRecord.findOneAndUpdate(query, update).exec((err, data) => {
		if (err) console.log(err)
		else console.log(data)
	})
	return res.end()
})

router.get('/getnote', (req, res) => {
	const username = req.query.user
	User.findOne({ username: username })
		.then(result => {
			const userId = result._id
			Note.find({user: userId})
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
	const wordId = req.body.wordId
	const username = req.body.user
	console.log(req.body)
	User.findOne({ username: username })
		.then(result => {
			const userId = result._id
			const noteData = {
				_id: new mongoose.Types.ObjectId(),
				word: wordId,
				user: userId
			}
			Note.create(noteData, error => {
				if (error) {
					return console(error);
				} else {
					return res.end()
				}
			});
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
