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

		if (this.props.deleteOneFromList !== prevProps.deleteOneFromList) {
			console.log('deleteOneFromList BookList.js',this.props.deleteOneFromList, this.state);
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
				{bookTitles}
			</div>
		);
	}
}

export default BookList;