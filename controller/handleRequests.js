const Model = require('../model/Book');

module.exports = {

	getAllBooks: (req, res) => {
		 Model.getAllBooks(req.body, (dbRes, code) => {
	        res.status(code).send(dbRes);
	    });
	},

	addBook: (req, res) => {
		Model.addBook(req.body, (dbRes, code) => {
	        res.status(code).send(dbRes);
	    });
	},

	addComment: (req, res) => {
		Model.addComment(req, (dbRes, code) => {
			res.status(code).send(dbRes);
		});
	},

	deleteAllBooks: (req, res) => {
		Model.deleteAllBooks(req.body, (dbRes, code) => {
	        res.status(code).send(dbRes);
	    });
	},

	deletOneBook: (req, res) => {
		const bookId = req.params.id;
		Model.deleteOneBook(bookId, (dbRes, code) => {
			res.status(code).send(dbRes);
		});
	}
}