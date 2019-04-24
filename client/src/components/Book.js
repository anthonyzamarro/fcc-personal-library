import React, { Component } from 'react';

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addCommentsForm: false,
			commentText: ""
		}

		this.deletOne = this.deletOne.bind(this);
		this.addCommentButton = this.addCommentButton.bind(this);
		this.getCommentText = this.getCommentText.bind(this);

	}

	componentDidUpdate(prevProps) {
		if (prevProps.commentFromId !== this.props.commentFromId) {
			this.props.bookInfo.comments.push(this.props.commentFromId);
			this.forceUpdate();
		}
	}

	addCommentButton(id) {
		this.setState({
			addCommentsForm: !this.state.addCommentsForm,
			bookId: id
		})
	}

	getCommentText(e) {
		this.setState({commentText: e.target.value})
	}

	deletOne(bookId) {
		fetch(`/api/books/${bookId}`, {
			method: 'DELETE',
			body: JSON.stringify({
		      id: bookId
		    }),
		    headers: {
		    	"Accept": "application/json",
		    	"Content-Type": "application/json"
		    }
		})
		.then(response => {
			if (response.ok) {
		    return response.json()
		  }
		})
		.then(res => {
			console.log(this.props)
			this.props.deleteOneBook(res._id)
		})
		.catch(err => console.log('deletOne err', err))
	}

	render() {
		let bookComments = this.props.bookInfo.comments.length <= 0 
		? '' : this.props.bookInfo.comments.map((comment, key) => {
			return <li key={key} className="text">{comment}</li>
		});
		return (
			<div className="Book">
				<h3>Book</h3>
				<div className="book-info">
					<div className="book-title"><strong>Title:</strong><div className="text">{this.props.bookInfo.title}</div></div>
					<div className="book-id"><strong>ID:</strong><div className="text">{this.props.bookInfo._id}</div></div>
					<div className="book-comments"><strong>Comments:</strong><br/><div className="text">{bookComments}</div></div>
				</div>
				{this.props.bookInfo !== "" && <button onClick={e => this.deletOne(this.props.bookInfo._id)} className="book-btn delete-btn">Delete book</button>}
			</div>
		)
	}
}

export default Book;
