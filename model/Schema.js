const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB, {useNewUrlParser: true}, (err, db) => {
	if (err) console.log('db error', err);
	console.log('connected to MongoDB');
});

const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	author: String,
	comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };