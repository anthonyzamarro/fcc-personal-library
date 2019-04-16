const { Book } = require('./Schema');

const getAllBooks = (books, cb) => {
  Book.find({}, (err, docs) => {
  	if (err) {
  		cb(err, 400);
  	} else {
  		cb(docs, 200);
  	}
  })
}

const getOneBook = (book, cb) => {
	Book.findById(book.params.id, (err, doc) => {
		if (err) {
			cb(err, 400)
		} else {
			cb(doc, 200)
		}
	})
}

const addBook = (book, cb) => {
  	if (book.title === '') {
  		return;
  	}

	const newBook = new Book({
		title: book.title
	});


	newBook.save((err) => {
		if (err) {
			cb(err, 400)
		} else {
			// const response = {, "id": newBook._id};
			cb(newBook._doc, 200)
		}
	});
}

const addComment = (book, cb) => {
	const bookId = book.params.id;
	const comment = book.body.comments;
	Book.findById(bookId, (err, doc) => {
		if (err) {
			cb(err, 200)
		} else {
			doc.comments.push(comment);
			doc.markModified('comments');
			doc.save();
			cb(doc, 200);
		}
	});
}

const deleteAllBooks = (books, cb) => {
	console.log('deleteAllBooks in Book.js', books);
	Book.collection.deleteMany({})
	cb('complete delete successful', 200)
}

const deleteOneBook = (bookId, cb) => {
	Book.deleteOne({_id: bookId}, (err, doc) => {
		if (err) {
			cb(err, 400);
		} else {
			cb('delete successful', 200)
		}
	})


}


module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  addComment,
  deleteAllBooks,
  deleteOneBook
}
