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
		this.addComment = this.addComment.bind(this);
		this.getCommentText = this.getCommentText.bind(this);
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

	addComment(e) {
		e.preventDefault();
		let text = this.state.commentText
		console.log(text, this.props.bookInfo)
		fetch(`http://localhost:3000/api/books/${this.props.bookInfo._id}`, {
			method: "POST",
			body: JSON.stringify({
		      comments: text
		    }),
		    headers: {"Content-Type": "application/json"}
		})
		.then(res => console.log(res))
		.then(response => console.log('addComment received', response))
		.catch(err => console.log('addCOmment error', err))
	}

	deletOne(bookId) {
		console.log('deletOne id', this.props)
		fetch(`http://localhost:3000/api/books/${bookId}`, {
			method: 'DELETE',
			body: JSON.stringify({
		      id: bookId
		    }),
		    headers: {"Content-Type": "application/json"}
		})
		.then(response => response)
		.then(res => this.props.deleteOneBook(bookId))
		.catch(err => console.log('deletOne err', err))
	}

	render() {
		// console.log('Book constructor', this.props);
		return (
			<div className="Book">
				{this.props.bookInfo.title}
				{this.props.bookInfo.comments}
				{this.props.bookInfo !== "" && <button onClick={e => this.deletOne(this.props.bookInfo._id)}>Delete book</button>}
				{this.props.bookInfo !== "" && <button onClick={e => this.addCommentButton(this.props.bookInfo._id)}>Add Comment</button>}
				{this.state.addCommentsForm && 
					<form onSubmit={this.addComment}>
						<input type="text" onChange={this.getCommentText} maxLength="50" />
						<input type="submit" value="add" />
					</form>
				}
			</div>
		)
	}
}

export default Book;