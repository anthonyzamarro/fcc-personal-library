import React, { Component } from 'react';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allBooks: []
		}
	}

	componentDidMount() {
		fetch('/api/books/')
			.then((response) => response.json())
			.then((books) => {
				this.setState({
					allBooks: this.state.allBooks.concat(books)
				})
			})
			.catch(err => console.log('didMount BookList err', err))
	}

	componentDidUpdate(prevProps) {
		if (this.props.addedBook._id !== prevProps.addedBook._id) {
			this.setState({
				allBooks: this.state.allBooks.concat(this.props.addedBook)
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
					className="text bl-text"
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