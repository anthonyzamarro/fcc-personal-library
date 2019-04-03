const { Book } = require('./Schema');

const getAllBooks = (books, cb) => {
  console.log('books in Book.js', books);
  cb('We did it', 200);
}

const addBook = (book, cb) => {
  console.log('books in Book.js', book);
  // console.log(`Issue.js createProject`, project.body)
	const newBook = new Book({
		// title: project.body.project_title
	})
	newBook.save((err) => {
		if (err) {
			cb(err, 400)
		} else {
			// const response = {...newProject, "id": newProject._id}
			cb('added', 200)
		}
	});
}


module.exports = {
  getAllBooks,
  addBook
}
