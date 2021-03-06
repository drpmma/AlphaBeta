const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const app = express()
//connect to MongoDB
mongoose.connect('mongodb://localhost/alphabeta');
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("connected!")
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const root = path.resolve(__dirname, '..', '..')
app.use(express.static(path.join(root, 'dist')))
const router = require('./router')
app.use('/api', router)

app.listen(4000, () => console.log('AlphaBeta app listening on port 4000.\nhttp://localhost:4000/'))