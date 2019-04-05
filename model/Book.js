const { Book } = require('./Schema');

const getAllBooks = (books, cb) => {
  console.log('books in Book.js', books);
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


module.exports = {
  getAllBooks,
  addBook
}
