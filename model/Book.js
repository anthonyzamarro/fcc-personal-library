const { Book } = require('./Schema');

const getAllBooks = (books, cb) => {
  // console.log('books in Book.js', books);
  Book.find({}, (err, docs) => {
  	if (err) {
  		cb(err, 400);
  	} else {
  		cb(docs, 200);
  	}
  })
}

const addBook = (book, cb) => {
  console.log('books in Book.js', book);

	const newBook = new Book({
		title: book.title
	});

	newBook.save((err) => {
		if (err) {
			cb(err, 400)
		} else {
			const response = {...newBook, "id": newBook._id};
			cb(response, 200)
		}
	});
}

const addComment = (book, cb) => {
	const bookId = book.params.id;
	const comment = book.body.comments;
	Book.findById(bookId, (err, doc) => {
		console.log('addComment in Book.js', doc);
	});

}

const deleteAllBooks = (books, cb) => {
	console.log('deleteAllBooks in Book.js', books);
	Book.collection.deleteMany({})
	cb('complete delete successful', 200)
}

const deleteOneBook = (bookId, cb) => {
	// console.log('deleteOneBook in Book.js', bookId);
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
  addBook,
  addComment,
  deleteAllBooks,
  deleteOneBook
}
