import React, { Component } from 'react';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allBooks: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/books')
			.then((response) => {
				return response.json()
			})
			.then((books) => {
				this.setState({
					allBooks: this.state.allBooks.concat(books)
				})
			})
			.catch(err => console.log('didMount BookList err', err))
	}

	componentDidUpdate(prevProps) {
		// newBook added to list
		if (this.props.addedBook !== '' && this.props.addedBook.id !== prevProps.addedBook.id) {
			this.setState({
				allBooks: this.state.allBooks.concat(this.props.addedBook._doc)
			});
		}

		if (this.props.shouldDelete !== prevProps.shouldDelete) {
			this.setState({
				allBooks: []
			})
		}
	}


	render() {
		let bookTitles = this.state.allBooks.map((book, index) => {
			return (
				<li 
					key={book._id}
					onClick={e => this.props.oneFromList(book)}
				>
					{book.title}
				</li>
			)
		});

		return(
			<div className="BookList">
				{bookTitles}
			</div>
		);
	}
}

export default BookList;