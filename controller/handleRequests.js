const Model = require('../model/Book');

module.exports = {

	getAllBooks: (req, res) => {
		 Model.getAllBooks(req.body, (dbRes, code) => {
	        res.status(code).send(dbRes);
	    });
	},

	addBook: (req, res) => {
		Model.addBook(req.body, (dbRes, code) => {
			console.log('handleRequests addBook')
	        res.status(code).send(dbRes);
	    });
	}
}