import React, { Component } from 'react';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allBooks: []
		}
	}

	componentDidMount() {
		fetch('/api/books')
			.then((response) => response.json())
			.then((books) => {
				this.setState({
					allBooks: this.state.allBooks.concat(books)
				})
			})
			.catch(err => console.log('didMount BookList err', err))
	}

	componentDidUpdate(prevProps) {
		/*
			Not sending back correct response from routes
			Check flow from Model to Controller and make 
			sure the _doc is being sent back
		*/
		// newBook added to list
		if (this.props.addedBook !== '' && this.props.addedBook.id !== prevProps.addedBook.id) {
			console.log(this.props.addedBook);
			this.setState({
				allBooks: this.state.allBooks.concat(this.props.addedBook._doc)
			});
		}

		if (this.props.shouldDelete !== prevProps.shouldDelete) {
			this.setState({
				allBooks: []
			})
		}

		if (this.props.deleteOneFromList !== prevProps.deleteOneFromList) {
			this.setState({
				allBooks: this.state.allBooks.filter(book => book._id != this.props.deleteOneFromList)
			})
		}
	}


	render() {
		let bookTitles = this.state.allBooks.map((book, index) => {
			return (
				<li 
					key={book._id}
					onClick={e => this.props.viewOneFromList(book)}
				>
					{book.title}
				</li>
			)
		});

		return(
			<div className="BookList">
			<h3>Book List</h3>
				{bookTitles}
			</div>
		);
	}
}

export default BookList;