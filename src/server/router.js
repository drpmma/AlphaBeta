const express = require('express');
const router = express.Router();
const WordRecord = require('./model/wordRecord')
const User = require('./model/user')
const Vocab = require('./model/vocab')
const DicIntro = require('./model/dicIntro')
const learnWord = require('./learnWord')


router.get('/', (req, res) => res.json({ message: 'Jerry! welcome to our api!' }))
router.get('/dicintro', (req, res) => {
	DicIntro.find({}).then(dics => {res.json(dics)})
})
router.get('/word', (req, res) => {
	console.log('query', req.query)
	User.findOne({username:req.query.user})
	.populate({
		path: 'words',
		populate: {
			path: 'word',
			model: 'dic'
		}
	})
	.exec((err, data) => {
		if (err) return console.log(err)
		else res.json(learnWord(data.words))
	})
})

router.post('/inital', (req, res) => {
	User.findOne({username:req.body.user})
		.then(result => {
			if (result.words.length == 0) {
				Vocab.find({type:req.body.dic}).then(result => {
					WordRecord.initRecord(result)
					const RecordID = WordRecord.initRecord(result)
					User.update({username:req.body.user}, {
						$push: {
							words:{$each: RecordID},
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
			else {
				console.log(111)
				// todo
			}
		})

	return res.end()
})

//POST route for updating data
router.post('/user', function (req, res, next) {
	if (req.body.passwordConf && (req.body.password !== req.body.passwordConf)) {
		const err = new Error('Passwords do not match.');
		err.status = 400;
		res.send("passwords dont match");
		return next(err);
	}

	if (req.body.username &&
		req.body.password &&
		req.body.passwordConf) {

		const userData = {
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


// router.get('/profile', function (req, res, next) {
// 	User.findById(req.session.userId)
// 		.exec(function (error, user) {
// 			if (error) {
// 				return next(error);
// 			} else {
// 				if (user === null) {
// 					const err = new Error('Not authorized! Go back!');
// 					err.status = 400;
// 					return next(err);
// 				} else {
// 					return res.send('<h1>Name: </h1>' + user.username + '<br><a type="button" href="/logout">Logout</a>')
// 				}
// 			}
// 		});
// });

// // GET for logout logout
// router.get('/logout', function (req, res, next) {
// 	if (req.session) {
// 		// delete session object
// 		req.session.destroy(function (err) {
// 			if (err) {
// 				return next(err);
// 			} else {
// 				return res.redirect('/');
// 			}
// 		});
// 	}
// });

module.exports = router;