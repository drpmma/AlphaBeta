const express = require('express');
const router = express.Router();
const User = require('./model/user')

router.get('/', (req, res) => res.json({ message: 'Jerry! welcome to our api!' }))
router.get('/book', (req, res) => res.json({ title: '上下五千年' }))

//POST route for updating data
router.post('/user', function (req, res, next) {
	// confirm that user typed same password twice
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

		User.create(userData, function (error, user) {
			if (error) {
				return next(error);
			} else {
				req.session.userId = user._id;
				return res.json({user: user._id})
			}
		});

	} else if (req.body.username && req.body.password) {
		User.authenticate(req.body.username, req.body.password, function (error, user) {
			if (error || !user) {
				const err = new Error('Wrong username or password.');
				err.status = 401;
				return next(err);
			} else {
				req.session.userId = user._id;
				return res.json({user: user._id})
			}
		});
	} else {
		const err = new Error('All fields required.');
		err.status = 400;
		return next(err);
	}
})

// GET route after registering
router.get('/profile', function (req, res, next) {
	User.findById(req.session.userId)
		.exec(function (error, user) {
			if (error) {
				return next(error);
			} else {
				if (user === null) {
					const err = new Error('Not authorized! Go back!');
					err.status = 400;
					return next(err);
				} else {
					return res.send('<h1>Name: </h1>' + user.username + '<br><a type="button" href="/logout">Logout</a>')
				}
			}
		});
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;